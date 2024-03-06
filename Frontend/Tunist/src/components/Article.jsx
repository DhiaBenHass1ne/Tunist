import React from 'react'
import ArticleCarousel from './ArticleCarousel'
const Article = ({article}) => {
  console.log("THIS IS THE ARTICLE COMPONENT", article)
  const style={
        border: '2px solid black',
  }
  return (
    <div className='container' >
      <div className="row"><ArticleCarousel media={article && article.media} publisher={article && article.publisher}/></div>
      <div className="row justify-content-center m-auto">
        <h1 className='display-1 text-center fst-italic'>{article.article.title}</h1>
        <p className='fs-5' style={{ whiteSpace: 'pre-line' }}>{article.article.content}</p>
      </div>
    </div>
  )
}

export default Article
