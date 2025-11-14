// assets/js/article-renderer.js
// Article template system for dynamic content rendering

function findArticleById(articleId) {
    // Search in articles data
    let article = null;
    
    if (typeof articlesData !== 'undefined') {
        article = articlesData.find(a => a.id === articleId || a.slug === articleId);
    }
    
    return article;
}

function generateArticleHTML(article) {
    if (!article) return '<p>Article not found.</p>';
    
    let html = `
        <article>
            <h1 class="article-title">${article.title}</h1>
            <div class="article-meta">
                <p>Published: ${article.date} | Author: ${article.author} | ${article.readTime} | Category: ${article.category}</p>
            </div>
            
            <div class="article-content">
    `;
    
    // Render content blocks
    if (article.content && article.content.length > 0) {
        article.content.forEach(block => {
            switch (block.type) {
                case 'paragraph':
                    html += `<p>${block.text}</p>`;
                    break;
                case 'image':
                    // Adjust path for template folder
                    let imageSrc = block.src;
                    if (imageSrc.startsWith('assets/')) {
                        imageSrc = '../' + imageSrc;
                    }
                    html += `<img src="${imageSrc}" alt="${block.alt}" class="article-image">`;
                    break;
                case 'heading':
                    html += `<h3>${block.text}</h3>`;
                    break;
                case 'list':
                    html += '<ul>';
                    block.items.forEach(item => {
                        html += `<li>${item}</li>`;
                    });
                    html += '</ul>';
                    break;
                default:
                    html += `<p>${block.text || ''}</p>`;
            }
        });
    } else {
        // Fallback to excerpt if no detailed content
        html += `<p>${article.excerpt}</p>`;
    }
    
    html += `
            </div>
            
            <div class="article-navigation">
                <p><a href="../pages/news.html" class="btn">← Back to News</a></p>
            </div>
        </article>
    `;
    
    return html;
}

function renderArticlePage() {
    // Get article ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (!articleId) {
        // Try to get article ID from path (fallback for existing URLs)
        const path = window.location.pathname;
        const pathParts = path.split('/');
        const folderName = pathParts[pathParts.length - 2]; // Get folder name
        
        if (folderName && folderName !== 'articles') {
            renderArticleById(folderName);
            return;
        }
        
        document.getElementById('article-content').innerHTML = '<p>Article not found.</p>';
        return;
    }
    
    renderArticleById(articleId);
}

function renderArticleById(articleId) {
    const article = findArticleById(articleId);
    const html = generateArticleHTML(article);
    
    const container = document.getElementById('article-content');
    if (container) {
        container.innerHTML = html;
        
        // Update page title
        if (article) {
            document.title = `${article.title} - VN to You Tour`;
        }
    }
}

// Auto render when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Only render if we have article-content container
    if (document.getElementById('article-content')) {
        renderArticlePage();
    }
});