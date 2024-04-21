'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { Router } from 'next/router';

const MyProfile = () => {

    const {data: session} = useSession();
    const router = useRouter();

    const [posts, setposts] = useState([])

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
          setposts(data);
        }
    
        if (session?.user.id) fetchPosts();
      }, [])


    const handleEdit = (post) => {

        router.push(`/update-prompt?id=${post._id}`)

    }

    const handleDelete = async (post) => {

        const hasConfirmed = confirm("Are you sure you want to delete this post?");
        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setposts(filteredPosts);
            } catch (error) {
                
            }
        }

    }


    return (
        <Profile 
            name="My Profile"
            desc ='Welcome to your profile page. Here you can view your posts and edit your profile.'
            data = {posts}
            handleEdit = {handleEdit}
            handleDelete = {handleDelete}
        />
    )
    }

export default MyProfile