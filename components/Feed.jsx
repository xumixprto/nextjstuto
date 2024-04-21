'use client';

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard';
import { set } from 'mongoose';

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
        )
      )}
    </div>
  )
}


const Feed = () => {

  const [searchText, setsearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([])
  const [posts, setposts] = useState([])

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setsearchText(e.target.value);
    setSearchTimeout(setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchedResults(searchResult)
    }, 500));  
  }


  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleTagClick = (tag) => {
    setsearchText(tag);
    const searchResult = filterPrompts(tag);
    setSearchedResults(searchResult)
  
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setposts(data);
    }

    fetchPosts();
  }, [])

  return (
    <section className='feed'>
      <form className="relative w-full flex-center" onSubmit={(e) => e.preventDefault()}>
        <input 
          type="text"
          placeholder='Search for a tag or username' 
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data = {(searchText==='') ? posts : searchedResults}
        handleTagClick={handleTagClick}
      >
      </PromptCardList>
    </section>
  )
}

export default Feed