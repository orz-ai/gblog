/**
 * 初始化搜索功能
 */
function initSearch() {
    // 获取查询参数
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('q');
    
    // 如果没有查询参数，不进行搜索
    if (!query || query.trim() === '') {
        document.getElementById('search-results').innerHTML = '<div class="search-info">请输入搜索关键词</div>';
        return;
    }
    
    // 确保搜索数据已加载
    if (!window.searchData || !window.searchData.pages) {
        document.getElementById('search-results').innerHTML = '<div class="search-info">搜索数据加载失败</div>';
        console.error('搜索数据不可用', window.searchData);
        return;
    }
    
    console.log('搜索数据:', window.searchData);
    console.log('搜索关键词:', query);
    
    // 设置Fuse.js配置
    const fuseOptions = {
        includeScore: true,
        threshold: 0.4,       // 提高阈值，使搜索更宽松
        location: 0,
        distance: 100,
        minMatchCharLength: 2,
        keys: [
            { name: "title", weight: 0.8 },
            { name: "content", weight: 0.5 },
            { name: "categories", weight: 0.3 },
            { name: "tags", weight: 0.3 }
        ]
    };
    
    // 初始化Fuse搜索
    const fuse = new Fuse(window.searchData.pages, fuseOptions);
    
    // 执行搜索
    const results = fuse.search(query);
    console.log('搜索结果:', results);
    
    // 显示搜索结果
    displayResults(results, query);
}

/**
 * 显示搜索结果
 * @param {Array} results - 搜索结果数组
 * @param {string} query - 搜索查询
 */
function displayResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    
    // 如果没有结果
    if (!results || results.length === 0) {
        resultsContainer.innerHTML = `<div class="search-info">没有找到与 "${query}" 相关的内容</div>`;
        return;
    }
    
    // 显示结果数量
    let resultsHTML = `<div class="search-info">找到 ${results.length} 个与 "${query}" 相关的结果</div>`;
    
    // 显示每个搜索结果
    resultsHTML += '<div class="search-results-list">';
    
    // 获取站点基础URL，如果模板中定义了就使用它，否则使用当前位置作为基础
    const baseURL = window.siteBaseURL || '';
    
    results.forEach(result => {
        const item = result.item || result; // Fuse.js v6 vs v5/v4
        
        // 直接使用完整URL
        console.log('结果项完整URL:', item.url);
        const url = item.url;
        
        const date = new Date(item.date);
        const formattedDate = date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        
        // 确保分类和标签是数组
        const categories = Array.isArray(item.categories) ? item.categories : [];
        const tags = Array.isArray(item.tags) ? item.tags : [];
        
        resultsHTML += `
            <article class="post-card search-result">
                <h2 class="post-title"><a href="${url}">${item.title}</a></h2>
                <div class="post-meta">
                    <time>${formattedDate}</time>
                    ${categories.length > 0 ? 
                    `<span class="post-category">
                        <i class="fas fa-folder"></i>
                        <a href="${baseURL}categories/${encodeURIComponent(categories[0].toLowerCase())}/" target="_blank">${categories[0]}</a>
                    </span>` : ''}
                    ${tags.length > 0 ? 
                    `<span class="post-tags-list">
                        <i class="fas fa-tags"></i>
                        ${tags.slice(0, 2).map(tag => 
                            `<a href="${baseURL}tags/${encodeURIComponent(tag.toLowerCase())}/" target="_blank" class="post-tag">${tag}</a>`
                        ).join(', ')}
                    </span>` : ''}
                </div>
                <div class="post-summary">
                    ${getExcerpt(item.content, query, 200)}
                </div>
                <a href="${url}" target="_blank" class="read-more">阅读更多</a>
            </article>
        `;
    });
    
    resultsHTML += '</div>';
    
    // 更新结果容器
    resultsContainer.innerHTML = resultsHTML;
    
    // 添加点击事件监听器以便调试
    document.querySelectorAll('.search-result a').forEach(link => {
        link.addEventListener('click', function(e) {
            console.log('点击链接:', this.href);
        });
    });
}

/**
 * 获取内容的摘要，突出显示查询词
 * @param {string} content - 文章内容
 * @param {string} query - 搜索查询
 * @param {number} length - 摘要长度
 * @returns {string} 带有突出显示的摘要
 */
function getExcerpt(content, query, length) {
    if (!content) return '';
    
    // 查找查询词的位置
    const position = content.toLowerCase().indexOf(query.toLowerCase());
    
    // 如果找不到，返回开头的一部分内容
    if (position === -1) {
        return content.slice(0, length) + '...';
    }
    
    // 计算摘要的开始和结束位置
    let start = Math.max(0, position - length / 2);
    let end = Math.min(content.length, position + query.length + length / 2);
    
    // 截取摘要
    let excerpt = content.slice(start, end);
    
    // 如果不是从开头开始，添加省略号
    if (start > 0) {
        excerpt = '...' + excerpt;
    }
    
    // 如果不是到结尾结束，添加省略号
    if (end < content.length) {
        excerpt = excerpt + '...';
    }
    
    // 用加粗的查询词替换原文中的查询词（忽略大小写）
    const re = new RegExp('(' + escapeRegExp(query) + ')', 'gi');
    return excerpt.replace(re, '<strong>$1</strong>');
}

/**
 * 转义正则表达式特殊字符
 * @param {string} string - 需要转义的字符串
 * @returns {string} 转义后的字符串
 */
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
} 