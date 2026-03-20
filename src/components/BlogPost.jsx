import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { blogPosts } from '../data/blogData';
import SEO from './SEO';
import './BlogPost.css';

const BlogPost = () => {
    const { slug } = useParams();
    const post = blogPosts.find(p => p.slug === slug);

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
            
            <div className="container blog-post-container">
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
            </div>
        </article>
    );
};

export default BlogPost;
