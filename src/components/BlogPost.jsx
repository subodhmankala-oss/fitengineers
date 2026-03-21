import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import SEO from './SEO';
import './BlogPost.css';

const BlogPost = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

    const recentArticles = post 
        ? blogPosts
            .filter(p => p.category === post.category && p.id !== post.id)
            .sort((a, b) => new Date(b.createdAt || b.date).getTime() - new Date(a.createdAt || a.date).getTime())
            .slice(0, 3)
        : [];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [slug]);

    if (!post) {
        return (
            <div className="blog-post-page not-found">
                <div className="container" style={{ textAlign: 'center', paddingTop: '150px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Article Not Found</h2>
                    <Link to="/blog" className="btn btn-outline">&larr; Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="blog-post-page">
            <SEO 
                title={`${post.title} | Subodh Mankala`} 
                description={post.excerpt} 
                type="article" 
            />
            
            <div className="container blog-post-layout">
                <main className="blog-post-main">
                    <Link to="/blog" className="back-link">
                        <ChevronLeft size={20} /> Back to Articles
                    </Link>

                    <header className="blog-post-header">
                        <div className="post-meta">
                            <span className="post-category">{post.category}</span>
                            <span className="post-date">{post.date}</span>
                        </div>
                        <h1 className="post-title">{post.title}</h1>
                    </header>

                    <div className="post-hero-image">
                        <img src={post.image} alt={post.title} />
                    </div>

                    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                </main>

                {recentArticles.length > 0 && (
                    <aside className="blog-sidebar">
                        <h3 className="sidebar-title">RECENT ARTICLES</h3>
                        <div className="sidebar-articles-list">
                            {recentArticles.map(article => (
                                <Link to={`/blog/${article.slug}`} key={article.id} className="sidebar-article-card">
                                    <div className="sidebar-img-wrapper">
                                        <img src={article.image} alt={article.title} />
                                        <div className="sidebar-tags">
                                            <span className="sidebar-tag">{article.category}</span>
                                        </div>
                                    </div>
                                    <h4 className="sidebar-article-title">{article.title}</h4>
                                </Link>
                            ))}
                        </div>
                    </aside>
                )}
            </div>
        </article>
    );
};

export default BlogPost;
