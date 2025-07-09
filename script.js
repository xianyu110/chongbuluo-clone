document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.menu li');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const contentFrame = document.getElementById('content-frame');

    let activeItem = document.querySelector('.menu li.active');
    let searchUrl = activeItem?.dataset.searchUrl || 'https://www.google.com/search?q=';
    let homeUrl = activeItem?.dataset.homeUrl || 'https://www.google.com/webhp?igu=1';

    const updateSearchContext = (item) => {
        if (!item) return;

        // Update active class
        menuItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Update URLs and placeholder
        if (item.dataset.searchUrl) {
            searchUrl = item.dataset.searchUrl;
            homeUrl = item.dataset.homeUrl;
            const engineName = item.querySelector('a').textContent.trim();
            searchInput.placeholder = `在 ${engineName} 中搜索...`;
            
            // Load home page of the search engine
            if (homeUrl) {
                contentFrame.src = homeUrl;
            }
        }
    };

    // Set initial state
    updateSearchContext(activeItem);

    // Add click listeners to menu items
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            updateSearchContext(item);
        });
    });

    // Perform search
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query && searchUrl) {
            const url = searchUrl + encodeURIComponent(query);
            contentFrame.src = url;
        }
    };

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    /* 访问统计 */
    const countSpan = document.getElementById('visitor-count');
    if (countSpan) {
        const COUNTER_KEY = 'xianyu110-chongbuluo-clone-visited';
        const updateUrl = 'https://api.countapi.xyz/hit/xianyu110/chongbuluo-clone';
        const getUrl = 'https://api.countapi.xyz/get/xianyu110/chongbuluo-clone';

        const updateCount = () => {
            fetch(updateUrl)
                .then(res => res.json())
                .then(data => {
                    countSpan.textContent = data.value;
                })
                .catch(() => {
                    countSpan.textContent = 'N/A';
                });
        };

        const getCount = () => {
            fetch(getUrl)
                .then(res => res.json())
                .then(data => {
                    countSpan.textContent = data.value;
                })
                .catch(() => {
                    countSpan.textContent = 'N/A';
                });
        };

        if (!localStorage.getItem(COUNTER_KEY)) {
            // 首次访问：计数并存储标记
            updateCount();
            localStorage.setItem(COUNTER_KEY, 'true');
        } else {
            // 非首次：仅获取当前计数
            getCount();
        }
    }
}); 