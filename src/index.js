import * as $ from 'jquery'
import Post from '@models/post'
import logo from '@/assets/pngtd'
import '@/styles/styles.css'

const post = new Post('webpack post title', logo)

$('pre').html(post.toString())

console.log('Post to String:', post.toString())
