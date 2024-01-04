import React, { useState, FC } from 'react';
import hydrate from 'next-mdx-remote/hydrate';
import matter from 'gray-matter';
import { majorScale, Pane, Heading } from 'evergreen-ui';
import Logo from '../../components/logo';
import NewFolderButton from '../../components/newFolderButton';
import PostList from '../../components/postList';
import Head from 'next/head';
import { useRouter } from 'next/router';
import renderToString from 'next-mdx-remote/render-to-string';
import { Post } from '../../types';
import Container from '../../components/container';
import HomeNav from '../../components/homeNav';
import { categories, blogPosts } from '../../BLOG_DATA';
import path from 'path';

const AppPage: FC<{ folders?: any[]; activeFolder?: any; activeDoc?: any; activeDocs?: any[]; post: any; businessPosts: []; }> = ({
  folders,
  activeDoc,
  activeFolder,
  activeDocs,
  post,
  businessPosts
}) => {
  // Your component logic
};

AppPage.defaultProps = {
  // Your default props
};

export const getServerSideProps = async ({ params }) => {
  // Find the category that contains the post with the specified slug
  let category;
  let post;
  let businessPosts;

  for (const currentCategory in blogPosts) {
    post = blogPosts[currentCategory].find(post => post.slug === params.slug);

    if (post) {
      category = currentCategory;

      // Check if the category is 'business' and assign the array of posts directly
      if (category === 'business') {
        businessPosts = blogPosts[category];
      }

      break;
    }
  }

  // Return the post and businessPosts as props
  return {
    props: {
      post,
      category,
      businessPosts,
    },
  };
};

export default AppPage

