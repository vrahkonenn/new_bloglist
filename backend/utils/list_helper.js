const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    } else if (blogs.length === 1) {
        return blogs[0].likes
    } else if (blogs.length > 1) {
        const totalLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
        return totalLikes
    }
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 'no blogs'
    } else {
        return blogs.reduce((mostLikes, current) => 
            current.likes > mostLikes.likes ? current : mostLikes
        )
    } 
}

const mostBlogs = (blogs) => {

    if (blogs.length === 0) {
        return 'no blogs'
    }

    blogCounts = {}

    blogs.forEach(blog => {
        const author = blog.author
        if (blogCounts[author]) {
            blogCounts[author]++
        } else {
            blogCounts[author] = 1
        }
    })

    let topAuthor = null
    let maxCount = 0

    for (const author in blogCounts) {
        if (blogCounts[author] > maxCount) {
            topAuthor = author
            maxCount = blogCounts[author]
        }
    }

    return { author: topAuthor, blogCount: maxCount }
}

const mostLikes = (blogs) => {

    if (blogs.length === 0) {
        return 'no blogs'
    } 
    
    likeCounts = {}

    blogs.forEach(blog => {
        if (likeCounts[blog.author]) {
            likeCounts[blog.author] += blog.likes
        } else {
            likeCounts[blog.author] = blog.likes
        }
    })

    let topAuthor = null
    let maxLikes = 0

    for (const author in likeCounts) {
        if (likeCounts[author] > maxLikes) {
            maxLikes = likeCounts[author]
            topAuthor = author
        }
    }

    return { author: topAuthor, likes: maxLikes }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}