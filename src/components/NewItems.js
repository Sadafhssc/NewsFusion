import React, { Component } from 'react'

export default class NewItems extends Component {
  render() {
    let {title,description,imageUrl,date,url}= this.props;
    return (
     <>
     <div className="card">
  <img src={imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text text-danger">{date}</p>
    <a href={url} target="_blank" className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
</>
    )
  }
}
