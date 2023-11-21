import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiArticle } from '../../api/article';
import { Article as ArticleType } from '../../types/article';
import { ArticleComments } from './components/ArticleComments';
import { ArticleBanner } from './components/ArticleBanner';
import { markdown } from '../../utils';
import { ArticleMeta } from './components/ArticleMeta';

export function Article() {
  const { slug } = useParams();

  const [article, setArticle] = useState<ArticleType>();
  useEffect(() => {
    if (!slug) return;
    apiArticle(slug).then(setArticle);
  }, [slug]);

  return (
    <div className="article-page">
      {article && (
        <>
          <ArticleBanner article={article} />

          <div className="container page">
            <div className="row article-content">
              <div
                className="col-md-12"
                dangerouslySetInnerHTML={{
                  __html: markdown(article.body),
                }}
              />
            </div>

            <hr />
            <div className="article-actions">
              <ArticleMeta article={article} />
            </div>
          </div>
          <ArticleComments slug={article.slug} />
        </>
      )}
    </div>
  );
}