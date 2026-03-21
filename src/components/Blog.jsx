import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { blogPosts } from '../data/blogData';
import SEO from './SEO';
import './Blog.css';

const Blog = () => {
    const [searchParams] = useSearchParams();
    const categoryFilter = searchParams.get('category');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [categoryFilter]);

    const sortedPosts = [...blogPosts].sort((a, b) => {
        const timeB = new Date(b.createdAt || b.date).getTime();
        const timeA = new Date(a.createdAt || a.date).getTime();
        const timeDiff = timeB - timeA;
        return timeDiff === 0 ? b.id - a.id : timeDiff;
    });

    const filteredPosts = categoryFilter
        ? sortedPosts.filter(post => post.category === categoryFilter)
        : sortedPosts;

    return (
        <div className="blog-page">
            <SEO
                title="Health & Fitness Blog | Subodh Mankala"
                description="Read the latest articles on fitness, nutrition, and wellness by expert personal trainer Subodh Mankala in Hyderabad."
                type="website"
            />

            <section className="blog-header">
                <div className="container">
                    <h1 className="blog-title">
                        {categoryFilter ? categoryFilter.toUpperCase() : "HEALTH & WELLNESS"} <span className="text-highlight">{categoryFilter ? "ARTICLES" : "BLOG"}</span>
                    </h1>
                    <p className="blog-subtitle">Expert advice, nutrition tips, and training strategies to help you reach your peak potential.</p>
                </div>
            </section>

            <section className="blog-content">
                <div className="container">
                    <div className="blog-grid">
                        {filteredPosts.length > 0 ? filteredPosts.map(post => (
                            <article className="blog-card" key={post.id}>
                                <div className="blog-img-wrapper">
                                    <img src={post.image} alt={post.title} loading="lazy" />
                                    <span className="blog-category">{post.category}</span>
                                </div>
                                <div className="blog-card-content">
                                    <span className="blog-date">{post.date}</span>
                                    <h3 className="blog-post-title">{post.title}</h3>
                                    <p className="blog-post-excerpt">{post.excerpt}</p>
                                    <Link to={`/blog/${post.slug}`} className="read-more-btn">Read Article &rarr;</Link>
                                </div>
                            </article>
                        )) : (
                            <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '50px 0', color: 'var(--text-secondary)' }}>
                                <h3>No articles found for "{categoryFilter}". Stay tuned for updates!</h3>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
