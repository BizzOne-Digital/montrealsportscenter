import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { fetchBlog } from '../utils/api';
import Reveal from '../components/common/Reveal';
import { pick } from '../utils/localize';
import './BlogPage.css';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=75&auto=format';
const CATEGORIES = ['all', 'news', 'programs', 'events', 'community', 'tips'];

export default function BlogPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchBlog({ category: category || undefined, page }).then(res => {
      setPosts(res.data || []);
      setTotal(res.total || 0);
      setPages(res.pages || 1);
    }).finally(() => setLoading(false));
  }, [category, page]);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <Reveal as="div" className="container">
          <div className="section-label">{t('blog.label')}</div>
          <h1>{t('blog.headline1')} <span className="text-orange">{t('blog.headline2')}</span></h1>
          <p>{t('blog.description')}</p>
        </Reveal>
      </div>

      <div className="container">
        <div className="blog-cats">
          {CATEGORIES.map(c => (
            <button key={c} className={`cat-btn ${(category === c || (!category && c === 'all')) ? 'active' : ''}`} onClick={() => { setCategory(c === 'all' ? '' : c); setPage(1); }}>
              {t(`blog.categories.${c}`)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="blog-loading">{t('blog.loading')}</div>
        ) : posts.length === 0 ? (
          <div className="blog-empty">{t('blog.empty')}</div>
        ) : (
          <>
            {featured && (
              <Reveal as="div">
                <Link to={`/blog/${featured.slug}`} className="blog-featured">
                  <div className="bf-image"><img src={featured.image || FALLBACK_IMG} alt={pick(featured, 'title', lang)} /></div>
                  <div className="bf-info">
                    <div className="bf-category">{featured.category}</div>
                    <h2>{pick(featured, 'title', lang)}</h2>
                    <p>{pick(featured, 'excerpt', lang)}</p>
                    <div className="bf-meta">
                      <span>{featured.author}</span>
                      <span>·</span>
                      <span>{featured.publishedAt ? new Date(featured.publishedAt).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            )}
            <div className="blog-grid">
              {rest.map((post, i) => (
                <Reveal as="div" key={post._id} delay={i * 50}>
                  <Link to={`/blog/${post.slug}`} className="blog-card card">
                    <div className="bc-image"><img src={post.image || FALLBACK_IMG} alt={pick(post, 'title', lang)} loading="lazy" /></div>
                    <div className="bc-body">
                      <div className="bc-category">{post.category}</div>
                      <h4>{pick(post, 'title', lang)}</h4>
                      <p>{pick(post, 'excerpt', lang)}</p>
                      <div className="bc-meta">
                        <span>{post.author}</span>
                        <span>·</span>
                        <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(lang === 'fr' ? 'fr-CA' : 'en-CA', { month: 'short', day: 'numeric' }) : ''}</span>
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            {pages > 1 && (
              <div className="blog-pagination">
                {Array.from({ length: pages }, (_, i) => (
                  <button key={i} className={`page-btn ${page === i + 1 ? 'active' : ''}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
