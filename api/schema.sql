-- Facebook Clone Database Schema
-- PostgreSQL Database Setup

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    city VARCHAR(255),
    website VARCHAR(255),
    profilePic VARCHAR(255),
    coverPic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    "desc" TEXT,
    img VARCHAR(500),
    userId INTEGER NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    "desc" TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (postId) REFERENCES posts(id) ON DELETE CASCADE,
    UNIQUE(userId, postId)
);

-- Create relationships table (followers/following)
CREATE TABLE IF NOT EXISTS relationships (
    id SERIAL PRIMARY KEY,
    followerUserId INTEGER NOT NULL,
    followedUserId INTEGER NOT NULL,
    FOREIGN KEY (followerUserId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (followedUserId) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(followerUserId, followedUserId)
);

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
    id SERIAL PRIMARY KEY,
    img VARCHAR(500) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId INTEGER NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_userId ON posts(userId);
CREATE INDEX IF NOT EXISTS idx_comments_postId ON comments(postId);
CREATE INDEX IF NOT EXISTS idx_comments_userId ON comments(userId);
CREATE INDEX IF NOT EXISTS idx_likes_postId ON likes(postId);
CREATE INDEX IF NOT EXISTS idx_likes_userId ON likes(userId);
CREATE INDEX IF NOT EXISTS idx_relationships_follower ON relationships(followerUserId);
CREATE INDEX IF NOT EXISTS idx_relationships_followed ON relationships(followedUserId);
CREATE INDEX IF NOT EXISTS idx_stories_userId ON stories(userId);
