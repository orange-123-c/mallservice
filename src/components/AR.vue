<template>
 <div class="ar-mall-navigation">
    <!-- 商场选择弹窗 -->
    <div class="mall-selector-modal" v-if="showMallSelector">
      <div class="modal-content">
        <div class="modal-header">
          <h2>选择商场</h2>
          <button @click="showMallSelector = false">×</button>
        </div>
        
        <!-- 商场搜索框 -->
        <div class="mall-search">
          <input 
            type="text" 
            v-model="mallSearchQuery" 
            placeholder="搜索商场..."
            @keyup.enter="filterMalls"
          >
          <button @click="filterMalls">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <!-- 商场列表 -->
        <div class="malls-list">
          <div 
            class="mall-item" 
            v-for="(mall, index) in filteredMalls" 
            :key="mall.id"
            :class="{active: selectedMall.id === mall.id, disabled: index > 0}"
            @click="index === 0 ? selectMall(mall) : showToastMessage('该商场暂未开放')"
          >
            <div class="mall-image">
              <img :src="mall.image" :alt="mall.name">
              <div class="mall-status" v-if="index === 0">已上线</div>
              <div class="mall-status coming-soon" v-else>即将上线</div>
            </div>
            <div class="mall-info">
              <h3>{{ mall.name }}</h3>
              <p>{{ mall.address }}</p>
              <div class="mall-meta">
                <span>{{ mall.floorCount }}层</span>
                <span>{{ mall.shopCount }}家店铺</span>
              </div>
            </div>
            <div class="mall-action">
              <button v-if="index === 0" class="select-btn">选择</button>
              <span v-else class="coming-soon-text">敬请期待</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 顶部导航栏 -->
    <header class="header">
      <!-- 商场选择按钮 -->
      <button class="mall-select-btn" @click="showMallSelector = true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        {{ selectedMall.name }}
      </button>

      <div class="logo">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>智慧商场 AR 导览</span>
      </div>
  
      <nav class="nav-links">
        <button @click="switchTab('ar')" :class="{active: activeTab === 'ar'}">AR 导航</button>
        <button @click="switchTab('map')" :class="{active: activeTab === 'map'}">商场地图</button>
        <button @click="switchTab('shops')" :class="{active: activeTab === 'shops'}">店铺推荐</button>
      </nav>
      <div class="user-controls">
        <button class="icon-btn" @click="toggleCompass">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M16 12L12 8L8 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="icon-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V4C20 2.9 19.1 2 18 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16 11C16 13.21 14.21 15 12 15C9.79 15 8 13.21 8 11C8 8.79 9.79 7 12 7C14.21 7 16 8.79 16 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="main-content">
      <!-- AR导航视图 -->
      <section class="ar-view" v-if="activeTab === 'ar'">
        <div class="camera-view" :class="{arActive: isARMode}">
          <!-- AR摄像头模拟区域 -->
          <div class="ar-overlay">
            <div class="ar-crosshair" :class="{locked: isLocationLocked}"></div>
            
            <!-- AR路径指示 -->
            <div class="ar-path-container" v-if="showPath">
              <div class="path-marker" v-for="(marker, index) in pathMarkers" 
                   :key="index"
                   :style="{top: marker.top, left: marker.left}">
                <div class="marker-dot"></div>
              </div>
              <div class="direction-arrow" :style="{transform: `translate(-50%, -50%) rotate(${directionAngle}deg)`}">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="#38bdf8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12L12 5L19 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 5V19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            
            <!-- AR信息卡片 -->
            <div class="ar-info-card" v-if="showInfoCard">
              <div class="card-header">
                <img :src="selectedShop?.image || 'https://picsum.photos/50/50?random=1'" alt="店铺图标" class="card-icon">
                <div class="card-title">
                  <h3>{{ destination }}</h3>
                  <p>{{ estimatedTime }}分钟 | {{ distance }}米</p>
                </div>
              </div>
              <div class="card-body">
                <div class="progress-bar">
                  <div class="progress-fill" :style="{width: progress + '%'}"></div>
                </div>
                <div class="navigation-instructions">
                  <p>{{ currentInstruction }}</p>
                </div>
              </div>
              <div class="card-actions">
                <button class="action-btn" @click="pauseNavigation">
                  {{ isPaused ? '继续导航' : '暂停导航' }}
                </button>
                <button class="action-btn secondary" @click="endNavigation">结束导航</button>
              </div>
            </div>
          </div>
          <!-- 摄像头占位图 -->
          <img :src="cameraImage" alt="AR场景" class="camera-placeholder">
          
          <!-- AR启动引导 -->
          <div class="ar-onboarding" v-if="!isARMode">
            <div class="onboarding-content">
              <h2>启动AR导航</h2>
              <p>将摄像头对准地面，系统将识别环境并生成导航路径</p>
              <div class="onboarding-steps">
                <div class="step-item" :class="{active: true}">
                  <span class="step-number">1</span>
                  <span class="step-text">开启摄像头权限</span>
                </div>
                <div class="step-item" :class="{active: true}">
                  <span class="step-number">2</span>
                  <span class="step-text">定位您的位置</span>
                </div>
                <div class="step-item">
                  <span class="step-number">3</span>
                  <span class="step-text">生成AR路径</span>
                </div>
              </div>
              <button class="start-ar-btn" @click="startARNavigation">开始AR导航</button>
            </div>
          </div>
        </div>
        
        <div class="ar-controls">
          <div class="search-bar">
            <input type="text" v-model="searchQuery" placeholder="搜索店铺、品牌或设施..." @keyup.enter="searchDestination">
            <button @click="searchDestination">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          
          <!-- 搜索结果下拉 -->
          <div class="search-results" v-if="showSearchResults">
            <div class="result-item" v-for="result in searchResults" :key="result.id" @click="selectDestination(result)">
              <img :src="result.image" alt="结果图标" class="result-icon">
              <div class="result-info">
                <h4>{{ result.name }}</h4>
                <p>{{ result.floor }}层 · {{ result.distance }}米</p>
              </div>
              <div class="result-category">{{ result.category }}</div>
            </div>
          </div>
          
          <div class="quick-destinations">
            <button class="destination-btn" @click="setDestinationFromQuick('星巴克')">
              <img src="https://picsum.photos/50/50?random=1" alt="星巴克">
              <span>星巴克</span>
            </button>
            <button class="destination-btn" @click="setDestinationFromQuick('电影院')">
              <img src="https://picsum.photos/50/50?random=2" alt="电影院">
              <span>电影院</span>
            </button>
            <button class="destination-btn" @click="setDestinationFromQuick('卫生间')">
              <img src="https://picsum.photos/50/50?random=3" alt="卫生间">
              <span>卫生间</span>
            </button>
            <button class="destination-btn" @click="setDestinationFromQuick('停车场')">
              <img src="https://picsum.photos/50/50?random=4" alt="停车场">
              <span>停车场</span>
            </button>
            <button class="destination-btn" @click="setDestinationFromQuick('客服中心')">
              <img src="https://picsum.photos/50/50?random=5" alt="客服中心">
              <span>客服中心</span>
            </button>
          </div>
          
          <div class="action-buttons">
            <button class="primary-btn" @click="toggleARMode">
              {{ isARMode ? '退出AR模式' : '启动AR导航' }}
            </button>
            <button class="secondary-btn" @click="showMap = !showMap">
              {{ showMap ? '关闭地图' : '查看地图' }}
            </button>
          </div>
        </div>
        
        <!-- 迷你地图弹窗 -->
        <div class="map-popup" v-if="showMap">
          <div class="map-header">
            <h3>{{ selectedMall.name }} 楼层地图</h3>
            <div class="map-controls-small">
              <button class="icon-btn" @click="zoomInMap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                </svg>
              </button>
              <button class="icon-btn" @click="zoomOutMap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13H5V11H19V13Z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <button @click="showMap = false">×</button>
          </div>
          <div class="map-content">
            <!-- 百度地图嵌入 -->
            <div class="baidu-map-container" :style="{width: '100%', height: '400px'}">
              <iframe 
                :src="baiduMapUrl" 
                width="100%" 
                height="100%" 
                frameborder="0" 
                allowfullscreen
                style="border-radius: 8px;"
              ></iframe>
            </div>
            
            <div class="floor-selector">
              <button v-for="floor in ['1F', '2F', '3F', 'B1']" :key="floor" 
                      @click="selectedFloor = floor" 
                      :class="{active: selectedFloor === floor}">
                {{ floor }}
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 商场地图视图 -->
      <section class="map-view" v-if="activeTab === 'map'">
        <div class="map-container">
          <div class="map-header-bar">
            <div class="floor-controls">
              <button v-for="floor in ['1F', '2F', '3F', 'B1']" :key="floor" 
                      @click="selectedFloor = floor" 
                      :class="{active: selectedFloor === floor}">
                {{ floor }}
              </button>
            </div>
            <div class="map-toolbar">
              <button class="icon-btn" @click="zoomInMap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="currentColor"/>
                </svg>
              </button>
              <button class="icon-btn" @click="zoomOutMap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 13H5V11H19V13Z" fill="currentColor"/>
                </svg>
              </button>
              <button class="icon-btn" @click="showPathOnMap = !showPathOnMap">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                </svg>
              </button>
              <button class="icon-btn" @click="toggleSatelliteView">
                {{ isSatelliteView ? '地图视图' : '卫星视图' }}
              </button>
            </div>
          </div>
          
          <!-- 百度地图主视图 -->
          <div class="map-large-inner" ref="mapContainer" style="width: 100%; height: 500px;"></div>
          
          <!-- 地图上的店铺标记 -->
          <div class="shop-markers-container" v-if="showPathOnMap">
            <div class="shop-marker" style="top: 300px; left: 400px" @click="showShopInfo('星巴克')">
              <img src="https://picsum.photos/50/50?random=1" alt="星巴克">
              <div class="marker-tooltip">星巴克</div>
            </div>
            <div class="shop-marker" style="top: 500px; left: 700px" @click="showShopInfo('优衣库')">
              <img src="https://picsum.photos/50/50?random=2" alt="优衣库">
              <div class="marker-tooltip">优衣库</div>
            </div>
            <div class="shop-marker" style="top: 200px; left: 900px" @click="showShopInfo('CGV影城')">
              <img src="https://picsum.photos/50/50?random=3" alt="CGV影城">
              <div class="marker-tooltip">CGV影城</div>
            </div>
          </div>
        </div>
        
        <!-- 地图侧边栏 -->
        <div class="map-sidebar">
          <div class="sidebar-section">
            <h3>当前导航</h3>
            <div class="navigation-summary" v-if="showPath">
              <div class="summary-header">
                <img :src="selectedShop?.image || 'https://picsum.photos/50/50?random=1'" alt="目的地" class="summary-icon">
                <div class="summary-info">
                  <h4>{{ destination }}</h4>
                  <p>{{ estimatedTime }}分钟 | {{ distance }}米</p>
                </div>
              </div>
              <div class="summary-actions">
                <button class="sidebar-btn" @click="switchTab('ar')">切换到AR导航</button>
                <button class="sidebar-btn secondary" @click="endNavigation">取消导航</button>
              </div>
            </div>
            <div class="no-navigation" v-else>
              <p>暂无活跃导航</p>
              <button class="sidebar-btn" @click="switchTab('shops')">选择目的地</button>
            </div>
          </div>
          
          <div class="sidebar-section">
            <h3>楼层设施</h3>
            <div class="facility-list">
              <div class="facility-item" @click="setDestinationFromQuick('卫生间')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 22V19H9V22H5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15 22V19H19V22H15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M2 2H22V16C22 17.1 21.1 18 20 18H4C2.9 18 2 17.1 2 16V2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M6 12H18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12 16V8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>卫生间</span>
              </div>
              <div class="facility-item" @click="setDestinationFromQuick('电梯')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 2V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 8H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 16H8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>电梯</span>
              </div>
              <div class="facility-item" @click="setDestinationFromQuick('扶梯')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 10L6 13L9 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M3 14L6 17L9 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15 14L18 17L21 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15 10L18 13L21 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9 10V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15 10V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>扶梯</span>
              </div>
              <div class="facility-item" @click="setDestinationFromQuick('停车场')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L15 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M10 20L13 20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 14L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M19 14H5C3.9 14 3 13.1 3 12V6C3 4.9 3.9 4 5 4H19C20.1 4 21 4.9 21 6V12C21 13.1 20.1 14 19 14Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>停车场</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 店铺推荐视图 -->
      <section class="shops-view" v-if="activeTab === 'shops'">
        <div class="shops-header">
          <div class="shops-search">
            <input type="text" v-model="shopSearchQuery" placeholder="搜索店铺..." @keyup.enter="filterShops">
            <button @click="filterShops">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M21 21L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
          <div class="shops-sort">
            <select v-model="sortBy" @change="sortShops">
              <option value="distance">距离优先</option>
              <option value="name">名称排序</option>
              <option value="rating">评分优先</option>
            </select>
          </div>
        </div>
        
        <div class="shops-filters">
          <button class="filter-btn" :class="{active: selectedCategory === 'all'}" @click="selectedCategory = 'all'">全部</button>
          <button class="filter-btn" :class="{active: selectedCategory === 'food'}" @click="selectedCategory = 'food'">餐饮</button>
          <button class="filter-btn" :class="{active: selectedCategory === 'fashion'}" @click="selectedCategory = 'fashion'">时尚</button>
          <button class="filter-btn" :class="{active: selectedCategory === 'entertainment'}" @click="selectedCategory = 'entertainment'">娱乐</button>
          <button class="filter-btn" :class="{active: selectedCategory === 'service'}" @click="selectedCategory = 'service'">服务</button>
          <button class="filter-btn" :class="{active: selectedCategory === 'beauty'}" @click="selectedCategory = 'beauty'">美妆</button>
          
          <div class="floor-filter">
            <span>楼层:</span>
            <button class="floor-btn" :class="{active: selectedShopFloor === 'all'}" @click="selectedShopFloor = 'all'">全部</button>
            <button class="floor-btn" :class="{active: selectedShopFloor === '1F'}" @click="selectedShopFloor = '1F'">1F</button>
            <button class="floor-btn" :class="{active: selectedShopFloor === '2F'}" @click="selectedShopFloor = '2F'">2F</button>
            <button class="floor-btn" :class="{active: selectedShopFloor === '3F'}" @click="selectedShopFloor = '3F'">3F</button>
            <button class="floor-btn" :class="{active: selectedShopFloor === 'B1'}" @click="selectedShopFloor = 'B1'">B1</button>
          </div>
        </div>
        
        <div class="shops-grid">
          <div class="shop-card" v-for="shop in filteredAndSortedShops" :key="shop.id">
            <img :src="shop.image" alt="店铺图片" class="shop-image">
            <div class="shop-rating" :style="{width: (shop.rating * 20) + '%'}">
              <div class="stars">★★★★★</div>
            </div>
            <div class="shop-info">
              <h3>{{ shop.name }}</h3>
              <p class="shop-category">{{ getCategoryName(shop.category) }} · {{ shop.floor }}</p>
              <div class="shop-meta">
                <span class="distance">{{ shop.distance }}m</span>
                <span class="opening-hours" :class="{open: shop.isOpen}">{{ shop.isOpen ? '营业中' : '已休息' }}</span>
              </div>
              <div class="shop-actions">
                <button class="navigate-btn" @click="navigateToShop(shop)">导航</button>
                <button class="favorite-btn" :class="{favorited: shop.isFavorite}" @click="toggleFavorite(shop.id)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 热门推荐 -->
        <div class="featured-section">
          <h3>热门推荐</h3>
          <div class="featured-slider">
            <div class="featured-card" v-for="shop in featuredShops" :key="shop.id">
              <img :src="shop.image" alt="特色店铺" class="featured-image">
              <div class="featured-overlay">
                <h4>{{ shop.name }}</h4>
                <p>{{ shop.feature }}</p>
                <button class="featured-btn" @click="navigateToShop(shop)">立即导航</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- 底部状态栏 -->
    <footer class="status-bar">
      <div class="location-info">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.03 7.03 1 12 1C16.97 1 21 5.03 21 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 13C13.66 13 15 11.66 15 10C15 8.34 13.66 7 12 7C10.34 7 9 8.34 9 10C9 11.66 10.34 13 12 13Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <span>{{ currentLocation }}</span>
        <span class="accuracy">±{{ accuracy }}m</span>
      </div>
      
      <div class="tech-status">
        <div class="sensor-status">
          <span class="sensor-item" :class="{active: sensors.gps}">GPS</span>
          <span class="sensor-item" :class="{active: sensors.compass}">罗盘</span>
          <span class="sensor-item" :class="{active: sensors.gyro}">陀螺仪</span>
        </div>
        <div class="signal-indicator">
          <span class="signal-bar"></span>
          <span class="signal-bar"></span>
          <span class="signal-bar"></span>
          <span class="signal-bar"></span>
        </div>
      </div>
      
      <div class="battery-status">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
          <path d="M22 11V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          <rect x="4" y="8" width="16" height="10" rx="1" :style="{width: batteryLevel + '%'}" fill="#38bdf8"></rect>
        </svg>
        <span>{{ batteryLevel }}%</span>
      </div>
    </footer>
    
    <!-- 提示弹窗 -->
    <div class="toast" v-if="showToast">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';

// 百度地图AK
const BAIDU_MAP_AK = 'qQrHFyPofYh8xAEztmCKpFkd3KfU0vOj';

// 状态管理
const activeTab = ref('ar');
const searchQuery = ref('');
const shopSearchQuery = ref('');
const destination = ref('');
const showPath = ref(false);
const isARMode = ref(false);
const showMap = ref(false);
const selectedFloor = ref('1F');
const showPathOnMap = ref(false);
const currentLocation = ref('1F 中庭位置');
const selectedCategory = ref('all');
const selectedShopFloor = ref('all');
const sortBy = ref('distance');
const isLocationLocked = ref(false);
const showInfoCard = ref(false);
const estimatedTime = ref('3');
const distance = ref('120');
const progress = ref(35);
const currentInstruction = ref('直行50米后左转');
const isPaused = ref(false);
const directionAngle = ref(45);
const mapZoom = ref(1);
const isSatelliteView = ref(false);
const accuracy = ref(3);
const batteryLevel = ref(87);
const sensors = ref({
  gps: true,
  compass: true,
  gyro: true
});
const showSearchResults = ref(false);
const selectedShop = ref(null);
const showToast = ref(false);
const toastMessage = ref('');
const cameraImage = ref('https://picsum.photos/1200/800?random=10');

// 商场选择相关状态
const showMallSelector = ref(false);
const mallSearchQuery = ref('');
const malls = ref([
  {
    id: 1,
    name: '万象城',
    address: '北京市朝阳区建国路88号',
    floorCount: 6,
    shopCount: 300,
    image: 'https://picsum.photos/200/150?random=1',
    lat: 39.9042,
    lng: 116.4074
  },
  {
    id: 2,
    name: '大悦城',
    address: '北京市海淀区中关村大街5号',
    floorCount: 8,
    shopCount: 400,
    image: 'https://picsum.photos/200/150?random=2',
    lat: 39.9834,
    lng: 116.3045
  },
  {
    id: 3,
    name: '王府井百货',
    address: '北京市东城区王府井大街255号',
    floorCount: 7,
    shopCount: 250,
    image: 'https://picsum.photos/200/150?random=3',
    lat: 39.9172,
    lng: 116.4038
  },
  {
    id: 4,
    name: '三里屯太古里',
    address: '北京市朝阳区三里屯路19号',
    floorCount: 5,
    shopCount: 200,
    image: 'https://picsum.photos/200/150?random=4',
    lat: 39.9390,
    lng: 116.4655
  }
]);
const selectedMall = ref(malls.value[0]);

// 百度地图URL
const baiduMapUrl = computed(() => {
  const { lat, lng } = selectedMall.value;
  return `https://api.map.baidu.com/marker?location=${lat},${lng}&title=${selectedMall.value.name}&content=${selectedMall.value.address}&output=html&ak=${BAIDU_MAP_AK}&width=800&height=400&zoom=18`;
});

// 过滤后的商场列表
const filteredMalls = computed(() => {
  if (!mallSearchQuery.value) return malls.value;
  return malls.value.filter(mall => 
    mall.name.toLowerCase().includes(mallSearchQuery.value.toLowerCase()) ||
    mall.address.toLowerCase().includes(mallSearchQuery.value.toLowerCase())
  );
});

// 路径标记点数据
const pathMarkers = ref([
  { top: '40%', left: '45%' },
  { top: '45%', left: '50%' },
  { top: '50%', left: '55%' },
  { top: '55%', left: '60%' },
  { top: '60%', left: '65%' },
]);

// 店铺数据
const shops = ref([
  { 
    id: 1, 
    name: '星巴克', 
    category: 'food', 
    floor: '1F', 
    distance: '50', 
    image: 'https://picsum.photos/300/200?random=1',
    rating: 4.8,
    isOpen: true,
    isFavorite: false,
    promotion: '第二杯半价'
  },
  { 
    id: 2, 
    name: '优衣库', 
    category: 'fashion', 
    floor: '2F', 
    distance: '80', 
    image: 'https://picsum.photos/300/200?random=2',
    rating: 4.5,
    isOpen: true,
    isFavorite: true,
    promotion: ''
  },
  { 
    id: 3, 
    name: 'CGV影城', 
    category: 'entertainment', 
    floor: '3F', 
    distance: '120', 
    image: 'https://picsum.photos/300/200?random=3',
    rating: 4.7,
    isOpen: true,
    isFavorite: false,
    promotion: '会员8折'
  },
  { 
    id: 4, 
    name: '海底捞', 
    category: 'food', 
    floor: '4F', 
    distance: '150', 
    image: 'https://picsum.photos/300/200?random=4',
    rating: 4.9,
    isOpen: true,
    isFavorite: false,
    promotion: ''
  },
  { 
    id: 5, 
    name: '苹果专卖店', 
    category: 'fashion', 
    floor: '1F', 
    distance: '30', 
    image: 'https://picsum.photos/300/200?random=5',
    rating: 4.6,
    isOpen: true,
    isFavorite: true,
    promotion: ''
  },
  { 
    id: 6, 
    name: '电玩城', 
    category: 'entertainment', 
    floor: 'B1', 
    distance: '200', 
    image: 'https://picsum.photos/300/200?random=6',
    rating: 4.4,
    isOpen: true,
    isFavorite: false,
    promotion: '充值优惠'
  },
  { 
    id: 7, 
    name: '母婴室', 
    category: 'service', 
    floor: '2F', 
    distance: '70', 
    image: 'https://picsum.photos/300/200?random=7',
    rating: 4.3,
    isOpen: true,
    isFavorite: false,
    promotion: ''
  },
  { 
    id: 8, 
    name: '卫生间', 
    category: 'service', 
    floor: '1F', 
    distance: '20', 
    image: 'https://picsum.photos/300/200?random=8',
    rating: 4.2,
    isOpen: true,
    isFavorite: false,
    promotion: ''
  },
  { 
    id: 9, 
    name: '兰蔻', 
    category: 'beauty', 
    floor: '1F', 
    distance: '40', 
    image: 'https://picsum.photos/300/200?random=9',
    rating: 4.7,
    isOpen: true,
    isFavorite: false,
    promotion: '新品上市'
  },
  { 
    id: 10, 
    name: '停车场', 
    category: 'service', 
    floor: 'B1', 
    distance: '180', 
    image: 'https://picsum.photos/300/200?random=10',
    rating: 4.0,
    isOpen: true,
    isFavorite: false,
    promotion: ''
  },
]);

// 热门推荐店铺
const featuredShops = computed(() => {
  return shops.value.filter(shop => shop.promotion);
});

// 搜索结果
const searchResults = computed(() => {
  if (!searchQuery.value) return [];
  return shops.value.filter(shop => 
    shop.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    getCategoryName(shop.category).toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// 过滤和排序后的店铺列表
const filteredAndSortedShops = computed(() => {
  let result = shops.value;
  
  // 按类别过滤
  if (selectedCategory.value !== 'all') {
    result = result.filter(shop => shop.category === selectedCategory.value);
  }
  
  // 按楼层过滤
  if (selectedShopFloor.value !== 'all') {
    result = result.filter(shop => shop.floor === selectedShopFloor.value);
  }
  
  // 按搜索词过滤
  if (shopSearchQuery.value) {
    result = result.filter(shop => 
      shop.name.toLowerCase().includes(shopSearchQuery.value.toLowerCase())
    );
  }
  
  // 排序
  if (sortBy.value === 'distance') {
    result.sort((a, b) => parseInt(a.distance) - parseInt(b.distance));
  } else if (sortBy.value === 'name') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy.value === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  }
  
  return result;
});

// 方法
const switchTab = (tab) => {
  activeTab.value = tab;
  if (tab === 'map') {
    showPathOnMap.value = showPath.value;
    initBaiduMap(); // 初始化百度地图
  }
};

// 选择商场
const selectMall = (mall) => {
  selectedMall.value = mall;
  showMallSelector.value = false;
  showToastMessage(`已切换到 ${mall.name}`);
  
  // 如果当前在地图标签页，重新初始化地图
  if (activeTab.value === 'map') {
    initBaiduMap();
  }
};

// 过滤商场
const filterMalls = () => {
  // 过滤逻辑在computed属性中实现
};

const searchDestination = () => {
  if (searchQuery.value.trim()) {
    showSearchResults.value = true;
  }
};

const selectDestination = (shop) => {
  destination.value = shop.name;
  selectedShop.value = shop;
  showPath.value = true;
  showPathOnMap.value = true;
  showInfoCard.value = true;
  showSearchResults.value = false;
  searchQuery.value = '';
  distance.value = shop.distance;
  estimatedTime.value = Math.ceil(parseInt(shop.distance) / 40).toString();
  showToastMessage(`已开始导航至 ${shop.name}`);
  
  // 模拟导航进度更新
  startNavigationProgress();
};

const setDestinationFromQuick = (name) => {
  const shop = shops.value.find(shop => shop.name === name) || 
               {name, floor: '1F', distance: '100', image: 'https://picsum.photos/50/50?random=1'};
  destination.value = shop.name;
  selectedShop.value = shop;
  showPath.value = true;
  showPathOnMap.value = true;
  showInfoCard.value = true;
  distance.value = shop.distance || '100';
  estimatedTime.value = Math.ceil(parseInt(distance.value) / 40).toString();
  showToastMessage(`已开始导航至 ${shop.name}`);
  
  // 模拟导航进度更新
  startNavigationProgress();
};

const startNavigationProgress = () => {
  progress.value = 0;
  const interval = setInterval(() => {
    if (progress.value >= 100 || !showPath.value) {
      clearInterval(interval);
      if (progress.value >= 100) {
        showToastMessage('已到达目的地');
        setTimeout(() => {
          endNavigation();
        }, 2000);
      }
      return;
    }
    progress.value += 1;
    
    // 更新导航指令
    if (progress.value === 25) {
      currentInstruction.value = '前方即将到达扶梯口';
    } else if (progress.value === 50) {
      currentInstruction.value = '乘坐扶梯上二楼';
    } else if (progress.value === 75) {
      currentInstruction.value = '右转直行20米即达';
    }
  }, 300);
};

const startARNavigation = () => {
  isARMode.value = true;
  showToastMessage('AR模式已启动，正在定位...');
  
  setTimeout(() => {
    isLocationLocked.value = true;
    showToastMessage('位置锁定成功');
  }, 1500);
};

const toggleARMode = () => {
  isARMode.value = !isARMode.value;
  if (isARMode.value) {
    startARNavigation();
  } else {
    isLocationLocked.value = false;
    showToastMessage('已退出AR模式');
  }
};

const pauseNavigation = () => {
  isPaused.value = !isPaused.value;
  showToastMessage(isPaused.value ? '导航已暂停' : '导航已恢复');
};

const endNavigation = () => {
  showPath.value = false;
  showPathOnMap.value = false;
  showInfoCard.value = false;
  destination.value = '';
  selectedShop.value = null;
  progress.value = 0;
  isPaused.value = false;
  showToastMessage('导航已结束');
};

const navigateToShop = (shop) => {
  destination.value = shop.name;
  selectedShop.value = shop;
  showPath.value = true;
  showPathOnMap.value = true;
  showInfoCard.value = true;
  distance.value = shop.distance;
  estimatedTime.value = Math.ceil(parseInt(shop.distance) / 40).toString();
  switchTab('ar');
  showToastMessage(`已开始导航至 ${shop.name}`);
  
  // 模拟导航进度更新
  startNavigationProgress();
};

const showShopInfo = (name) => {
  const shop = shops.value.find(shop => shop.name === name);
  if (shop) {
    showToastMessage(`${shop.name} - ${shop.floor}层`);
  }
};

const toggleFavorite = (id) => {
  const shop = shops.value.find(shop => shop.id === id);
  if (shop) {
    shop.isFavorite = !shop.isFavorite;
    showToastMessage(shop.isFavorite ? `${shop.name}已加入收藏` : `${shop.name}已取消收藏`);
  }
};

const toggleCompass = () => {
  sensors.value.compass = !sensors.value.compass;
  showToastMessage(sensors.value.compass ? '电子罗盘已开启' : '电子罗盘已关闭');
};

const toggleSatelliteView = () => {
  isSatelliteView.value = !isSatelliteView.value;
  showToastMessage(isSatelliteView.value ? '已切换到卫星视图' : '已切换到地图视图');
  
  // 更新百度地图显示模式
  if (window.BMapGL) {
    if (isSatelliteView.value) {
      map.value.setMapType(window.BMAP_SATELLITE_MAP);
    } else {
      map.value.setMapType(window.BMAP_NORMAL_MAP);
    }
  }
};

const zoomInMap = () => {
  if (mapZoom.value < 1.5) {
    mapZoom.value += 0.1;
  }
  
  // 如果百度地图已初始化，同步缩放
  if (map.value) {
    map.value.zoomIn();
  }
};

const zoomOutMap = () => {
  if (mapZoom.value > 0.5) {
    mapZoom.value -= 0.1;
  }
  
  // 如果百度地图已初始化，同步缩放
  if (map.value) {
    map.value.zoomOut();
  }
};

const filterShops = () => {
  // 过滤逻辑在computed属性中实现
};

const sortShops = () => {
  // 排序逻辑在computed属性中实现
};

const showToastMessage = (message) => {
  toastMessage.value = message;
  showToast.value = true;
  
  setTimeout(() => {
    showToast.value = false;
  }, 2000);
};

const getCategoryName = (category) => {
  const categories = {
    'food': '餐饮',
    'fashion': '时尚',
    'entertainment': '娱乐',
    'service': '服务',
    'beauty': '美妆'
  };
  return categories[category] || category;
};

const floorToNum = (floor) => {
  const floorMap = { '1F': 5, '2F': 6, '3F': 7, 'B1': 8 };
  return floorMap[floor] || 5;
};

// 模拟摄像头图像变化
const changeCameraImage = () => {
  const random = Math.floor(Math.random() * 20) + 10;
  cameraImage.value = `https://picsum.photos/1200/800?random=${random}`;
};

// 模拟方向角度变化
const updateDirection = () => {
  directionAngle.value = (directionAngle.value + 1) % 360;
};

// 百度地图相关
let map = ref(null);
const mapContainer = ref(null);

// 初始化百度地图
const initBaiduMap = () => {
  if (!window.BMapGL || !mapContainer.value) return;
  
  // 如果地图已存在，先销毁
  if (map.value) {
    map.value = null;
  }
  
  // 创建地图实例
  map.value = new window.BMapGL.Map(mapContainer.value);
  
  // 设置中心点坐标
  const point = new window.BMapGL.Point(selectedMall.value.lng, selectedMall.value.lat);
  
  // 初始化地图，设置中心点坐标和地图级别
  map.value.centerAndZoom(point, 18);
  
  // 开启鼠标滚轮缩放
  map.value.enableScrollWheelZoom(true);
  
  // 设置地图类型
  map.value.setMapType(isSatelliteView.value ? window.BMAP_SATELLITE_MAP : window.BMAP_NORMAL_MAP);
  
  // 添加标记
  const marker = new window.BMapGL.Marker(point);
  map.value.addOverlay(marker);
  
  // 添加信息窗口
  const opts = {
    width: 200,
    height: 100,
    title: selectedMall.value.name
  };
  const infoWindow = new window.BMapGL.InfoWindow(`${selectedMall.value.address}<br>${selectedMall.value.shopCount}家店铺`, opts);
  marker.addEventListener('click', () => {
    map.value.openInfoWindow(infoWindow, point);
  });
  
  // 如果显示路径，添加示例路径
  if (showPathOnMap.value) {
    addPathToMap();
  }
};

// 添加路径到地图
const addPathToMap = () => {
  if (!map.value) return;
  
  const { lat, lng } = selectedMall.value;
  
  // 创建起点和终点
  const startPoint = new window.BMapGL.Point(lng, lat);
  const endPoint = new window.BMapGL.Point(lng + 0.001, lat + 0.001);
  
  // 创建折线
  const polyline = new window.BMapGL.Polyline([
    startPoint,
    new window.BMapGL.Point(lng + 0.0003, lat + 0.0002),
    new window.BMapGL.Point(lng + 0.0007, lat + 0.0005),
    endPoint
  ], {
    strokeColor: '#38bdf8',
    strokeWeight: 5,
    strokeOpacity: 0.8
  });
  
  // 添加折线到地图
  map.value.addOverlay(polyline);
  
  // 添加终点标记
  const endMarker = new window.BMapGL.Marker(endPoint);
  map.value.addOverlay(endMarker);
};

// 加载百度地图脚本
const loadBaiduMapScript = () => {
  return new Promise((resolve, reject) => {
    if (window.BMapGL) {
      resolve();
      return;
    }
    
    const script = document.createElement('script');
    script.src = `https://api.map.baidu.com/api?v=3.0&type=webgl&ak=${BAIDU_MAP_AK}`;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// 监听AR模式状态
watch(isARMode, (newVal) => {
  if (newVal) {
    // 启动摄像头图像变化定时器
    cameraInterval.value = setInterval(changeCameraImage, 3000);
    directionInterval.value = setInterval(updateDirection, 100);
  } else {
    // 清除定时器
    clearInterval(cameraInterval.value);
    clearInterval(directionInterval.value);
  }
});

// 定时器引用
const cameraInterval = ref(null);
const directionInterval = ref(null);

// 组件挂载时初始化
onMounted(async () => {
  // 模拟GPS定位过程
  setTimeout(() => {
    currentLocation.value = '1F 中庭位置 (已定位)';
    isLocationLocked.value = true;
    sensors.value.gps = true;
    showToastMessage('GPS定位成功');
  }, 2000);
  
  // 加载百度地图
  try {
    await loadBaiduMapScript();
    if (activeTab.value === 'map') {
      initBaiduMap();
    }
  } catch (error) {
    console.error('加载百度地图失败:', error);
    showToastMessage('地图加载失败，请检查网络连接');
  }
});

// 组件卸载时清理
onUnmounted(() => {
  clearInterval(cameraInterval.value);
  clearInterval(directionInterval.value);
});
</script>

<style scoped>
/* 商场选择弹窗样式 */
.mall-selector-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #0f172a;
  border-radius: 1rem;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h2 {
  margin: 0;
  color: #f8fafc;
}

.modal-header button {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.mall-search {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.mall-search input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  outline: none;
}

.mall-search input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.mall-search button {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: #3b82f6;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.malls-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mall-item {
  display: flex;
  gap: 1rem;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mall-item:hover:not(.disabled) {
  border-color: #38bdf8;
  background: rgba(15, 23, 42, 0.8);
}

.mall-item.active {
  border-color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
}

.mall-item.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mall-image {
  width: 120px;
  height: 90px;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.mall-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mall-status {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #22c55e;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.mall-status.coming-soon {
  background: #f59e0b;
}

.mall-info {
  flex: 1;
}

.mall-info h3 {
  margin: 0 0 0.5rem 0;
  color: #f8fafc;
}

.mall-info p {
  margin: 0 0 0.5rem 0;
  color: #94a3b8;
  font-size: 0.875rem;
}

.mall-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;
  color: #64748b;
}

.mall-action {
  display: flex;
  align-items: center;
  justify-content: center;
}

.select-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: #3b82f6;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.select-btn:hover {
  background: #2563eb;
}

.coming-soon-text {
  color: #f59e0b;
  font-size: 0.875rem;
}

/* 商场选择按钮样式 */
.mall-select-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.mall-select-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

/* 基础布局样式 */
.ar-mall-navigation {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #0f172a;
  color: #f8fafc;
  overflow: hidden;
}

.header {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background-color: #1e293b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  color: #38bdf8;
  flex: 1;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
}

.nav-links button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-links button.active {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
}

.nav-links button:hover:not(.active) {
  background: rgba(255, 255, 255, 0.05);
  color: #e2e8f0;
}

.user-controls {
  display: flex;
  gap: 0.5rem;
}

.icon-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.main-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* AR视图样式 */
.ar-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.camera-view {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.camera-placeholder {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ar-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.ar-crosshair {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 3rem;
  height: 3rem;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.ar-crosshair::before,
.ar-crosshair::after {
  content: '';
  position: absolute;
  background-color: rgba(255, 255, 255, 0.5);
}

.ar-crosshair::before {
  width: 2px;
  height: 1.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ar-crosshair::after {
  width: 1.5rem;
  height: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ar-crosshair.locked {
  border-color: #38bdf8;
}

.ar-crosshair.locked::before,
.ar-crosshair.locked::after {
  background-color: #38bdf8;
}

.ar-path-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
}

.path-marker {
  position: absolute;
  transform: translate(-50%, -50%);
}

.marker-dot {
  width: 0.75rem;
  height: 0.75rem;
  background-color: rgba(56, 189, 248, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.5);
}

.direction-arrow {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ar-info-card {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 500px;
  background: rgba(15, 23, 42, 0.9);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  pointer-events: auto;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.card-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
}

.card-title h3 {
  margin: 0;
  font-size: 1.1rem;
}

.card-title p {
  margin: 0;
  font-size: 0.875rem;
  color: #94a3b8;
}

.card-body {
  padding: 1rem;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: #38bdf8;
  border-radius: 0.25rem;
  transition: width 0.3s ease;
}

.navigation-instructions p {
  margin: 0;
  color: #e2e8f0;
}

.card-actions {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  background: #3b82f6;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.action-btn:hover {
  background: #2563eb;
}

.action-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.action-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.ar-onboarding {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}

.onboarding-content {
  text-align: center;
  max-width: 500px;
  padding: 2rem;
}

.onboarding-content h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #38bdf8;
}

.onboarding-content p {
  color: #94a3b8;
  margin-bottom: 2rem;
}

.onboarding-steps {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.5;
}

.step-item.active {
  opacity: 1;
}

.step-number {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #e2e8f0;
}

.step-item.active .step-number {
  background: #38bdf8;
  color: white;
}

.step-text {
  font-size: 0.875rem;
  color: #94a3b8;
}

.start-ar-btn {
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  border: none;
  background: #38bdf8;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.start-ar-btn:hover {
  background: #0ea5e9;
  transform: translateY(-2px);
}

.ar-controls {
  padding: 1rem;
  background: #1e293b;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.search-bar {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-bar input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  outline: none;
}

.search-bar input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.search-bar button {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: #3b82f6;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.search-bar button:hover {
  background: #2563eb;
}

.search-results {
  background: rgba(15, 23, 42, 0.8);
  border-radius: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  margin-bottom: 1rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.result-item:last-child {
  border-bottom: none;
}

.result-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.result-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

.result-info h4 {
  margin: 0;
  font-size: 0.875rem;
}

.result-info p {
  margin: 0;
  font-size: 0.75rem;
  color: #94a3b8;
}

.result-category {
  margin-left: auto;
  font-size: 0.75rem;
  color: #64748b;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
}

.quick-destinations {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.destination-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 80px;
}

.destination-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(56, 189, 248, 0.5);
}

.destination-btn img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
}

.destination-btn span {
  font-size: 0.75rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
}

.primary-btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  background: #38bdf8;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;
}

.primary-btn:hover {
  background: #0ea5e9;
}

.secondary-btn {
  flex: 1;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  cursor: pointer;
  transition: background 0.2s ease;
}

.secondary-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.map-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 800px;
  background: #1e293b;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  z-index: 100;
}

.map-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.map-header h3 {
  margin: 0;
}

.map-controls-small {
  display: flex;
  gap: 0.5rem;
}

.map-header button {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 1.25rem;
  cursor: pointer;
}

.map-content {
  padding: 1rem;
}

.floor-selector {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.floor-selector button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.floor-selector button.active {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.5);
}

/* 地图视图样式 */
.map-view {
  display: flex;
  height: 100%;
}

.map-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.map-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #1e293b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.floor-controls {
  display: flex;
  gap: 0.5rem;
}

.floor-controls button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.floor-controls button.active {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.5);
}

.map-toolbar {
  display: flex;
  gap: 0.5rem;
}

.map-large-inner {
  flex: 1;
  background: rgba(15, 23, 42, 0.5);
}

.shop-markers-container {
  position: relative;
  height: 100%;
}

.shop-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.shop-marker img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: 2px solid #38bdf8;
}

.marker-tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.shop-marker:hover .marker-tooltip {
  opacity: 1;
}

.map-sidebar {
  width: 300px;
  background: #1e293b;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.sidebar-section {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-section h3 {
  margin-top: 0;
  font-size: 1rem;
  color: #e2e8f0;
}

.navigation-summary {
  background: rgba(15, 23, 42, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
}

.summary-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.summary-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
}

.summary-info h4 {
  margin: 0;
  font-size: 0.875rem;
}

.summary-info p {
  margin: 0;
  font-size: 0.75rem;
  color: #94a3b8;
}

.summary-actions {
  display: flex;
  gap: 0.5rem;
}

.sidebar-btn {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: #3b82f6;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.sidebar-btn:hover {
  background: #2563eb;
}

.sidebar-btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.sidebar-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.no-navigation {
  text-align: center;
  padding: 1rem 0;
  color: #94a3b8;
}

.facility-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.facility-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.facility-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

/* 店铺推荐视图样式 */
.shops-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.shops-header {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: #1e293b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.shops-search {
  flex: 1;
  display: flex;
  gap: 0.5rem;
}

.shops-search input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  outline: none;
}

.shops-search input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.2);
}

.shops-search button {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  background: #3b82f6;
  border: none;
  color: white;
  cursor: pointer;
  transition: background 0.2s ease;
}

.shops-search button:hover {
  background: #2563eb;
}

.shops-sort select {
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(15, 23, 42, 0.5);
  color: #f8fafc;
  outline: none;
}

.shops-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(15, 23, 42, 0.5);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn.active {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.5);
}

.floor-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
}

.floor-filter span {
  color: #94a3b8;
}

.floor-btn {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: #94a3b8;
  cursor: pointer;
  transition: all 0.2s ease;
}

.floor-btn.active {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
  border-color: rgba(56, 189, 248, 0.5);
}

.shops-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
  overflow-y: auto;
}

.shop-card {
  background: #1e293b;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.2s ease;
}

.shop-card:hover {
  transform: translateY(-5px);
}

.card-badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: #f59e0b;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
}

.shop-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  position: relative;
}

.shop-rating {
  width: 100%;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.stars {
  color: #38bdf8;
  white-space: nowrap;
  overflow: hidden;
}

.shop-info {
  padding: 1rem;
}

.shop-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.shop-category {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: #94a3b8;
}

.shop-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 1rem;
}

.distance {
  color: #64748b;
}

.opening-hours {
  color: #64748b;
}

.opening-hours.open {
  color: #22c55e;
}

.shop-actions {
  display: flex;
  gap: 0.5rem;
}

.navigate-btn {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  background: #3b82f6;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.navigate-btn:hover {
  background: #2563eb;
}

.favorite-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.5rem;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.favorite-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.favorite-btn.favorited {
  color: #ef4444;
}

.featured-section {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.featured-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.featured-slider {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}

.featured-card {
  min-width: 280px;
  height: 150px;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(transparent, rgba(15, 23, 42, 0.9));
  padding: 1rem;
}

.featured-overlay h4 {
  margin: 0 0 0.5rem 0;
  color: white;
}

.featured-overlay p {
  margin: 0 0 1rem 0;
  color: #e2e8f0;
  font-size: 0.875rem;
}

.featured-btn {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #38bdf8;
  color: white;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.featured-btn:hover {
  background: #0ea5e9;
}

/* 底部状态栏样式 */
.status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background: #1e293b;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.75rem;
  color: #94a3b8;
}

.location-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.accuracy {
  font-size: 0.65rem;
  color: #64748b;
}

.tech-status {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.sensor-status {
  display: flex;
  gap: 0.5rem;
}

.sensor-item {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  color: #64748b;
}

.sensor-item.active {
  background: rgba(56, 189, 248, 0.1);
  color: #38bdf8;
}

.signal-indicator {
  display: flex;
  gap: 0.15rem;
  align-items: flex-end;
}

.signal-bar {
  width: 0.25rem;
  height: 0.5rem;
  background: #64748b;
  border-radius: 0.125rem;
}

.signal-bar:nth-child(2) {
  height: 0.75rem;
}

.signal-bar:nth-child(3) {
  height: 1rem;
}

.signal-bar:nth-child(4) {
  height: 1.25rem;
  background: #38bdf8;
}

.battery-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* 提示弹窗样式 */
.toast {
  position: fixed;
  top: 10rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
  padding: 0.75rem 1.5rem;
  border-radius: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  height: 55px;
  animation: toastFade 0.3s ease forwards;
}

@keyframes toastFade {
  from {
    opacity: 0;
    transform: translate(-50%, 1rem);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

/* 响应式样式 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
  
  .map-view {
    flex-direction: column;
  }
  
  .map-sidebar {
    width: 100%;
    height: 300px;
    border-left: none;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .floor-filter {
    margin-left: 0;
    margin-top: 0.5rem;
    width: 100%;
  }
  
  .shops-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
</style>