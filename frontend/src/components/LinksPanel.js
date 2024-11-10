import React, { useEffect, useState} from 'react';
import { API_URL } from '../config'

function LinksPanel() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
      fetch(`${API_URL}/links`)
        .then((response) => response.json())
        .then((data) => setPosts(data.data));
    }, []);
    return (
        <div className='intro'>
            <h3>🔥Ссылки на статьи🔥</h3>
            <hr/>
            <br/>
            <div className="container_links">
                {posts.map((post) => (
                    <div className="row_links" key={post.id}>
                        <div className="preview_container_links">
                                <a href={post.post_url} className="preview_links" target="_blank">
                                    <img src={`${API_URL}/${post.image_url}`} alt=""/>
                                    <div className="preview_title_links">{post.title}</div>
                                </a>
                        </div>
                        <div className="preview_container2_links">
                            <div className="description_links">
                                <h3>Описание</h3>
                                <p>
                                    {post.summary}
                                </p>
                            </div>
                        </div>
                    </div>
                    ))}
            </div>
            <div class="fire-wrapper">
              <span>🔥</span>
              <span>🔥</span>
            </div>
        </div>
        
    );
};

export default LinksPanel;