<template>
  <div class="post-detail">
      <div class="header">
          <div class="left" @click="$router.back()">
              <i class="iconfont iconjiantou2"></i>
              <i class="iconfont iconnew"></i>
          </div>
          <div class="right">
              <div class="btn-followed" v-if="post.has_follow" @click="unfollow">已关注</div>
              <div class="btn-follow" v-else @click="follow">关注</div>
          </div>
      </div>
      <!-- 新闻主题区域 渲染新闻 -->
      <div class="main">
          <div class="post-title">{{post.title}}</div>
          <div class="post-info">
              <span>{{post.user.nickname}}</span>
              <span>{{post.create_date | time}}</span>
          </div>
          <!-- 如果type为2，新闻则为视频 -->
          <!-- 视频 -->
          <div class="video" v-if="post.type===2">
              <!-- 因为有防盗链，导视频无法播放 -->
              <video :src="post.content" controls></video>
          </div>
          <div class="content" v-html="post.content" v-else></div>
          <!-- 赞和转发微信 -->
          <div class="some">
              <div class="num" @click="like" :class="{like:post.has_like}">
                  <span class="iconfont icondianzan" ></span>
                  <span>{{post.like_length}}</span>
              </div>
              <div class="wet">
                  <span class="iconfont iconweixin"></span>
                  <span>微信</span>
              </div>
          </div>
      </div>
      <!-- 跟帖 -->
      <div class="info">
          <div class="top">精彩跟帖</div>
          <!-- 评论组件 -->
          <!-- 将数据传递给组件，让组件渲染对应的数据 -->
          <hm-comment @reply="reply" v-for="item in commentList" :key="item.id" :comment="item"></hm-comment>
      </div>
      <!-- 底部 -->
      <div class="footer">
          <div class="post-comment" v-if="!isFocus">
            <input type="text" placeholder="写跟帖" @focus="handleFocus">
            <div class="comment">
              <i class="iconfont iconpinglun-"></i>
              <span>{{post.comment_length}}</span>
            </div>
            <i class="iconfont iconshoucang" @click="star" :class="{star:post.has_star}"></i>
            <i class="iconfont iconfenxiang"></i>
          </div>
          <!-- 文本域 -->
          <div class="post-area" v-else>
              <textarea ref="textarea" rows="3" placeholder="回复" @blur="handleBlur" v-model="content"></textarea>
              <div class="send" @click="send">发送</div>
          </div>
      </div>
  </div>
</template>

<script>
import HmComment from '../components/HmComment'
export default {
  components: {
    HmComment
  },
  data () {
    return {
      // 文章详细信息
      post: {
        user: {}
      },
      isFocus: false,
      //   评论列表
      commentList: [],
      parentId: '',
      content: ''
    }
  },
  created () {
    //   获取文章详情
    this.getPostDetail()
    // 获取评论列表
    this.getCommentList()
  },
  methods: {
    //   获取新闻详情
    async getPostDetail () {
      // 通过$route获取对应ID
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
      console.log(data)
    },
    // 获取评论列表
    async getCommentList () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
      }
      console.log(this.commentList)
    },
    async follow () {
      // id 需要关注文章的作者
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_follows/${id}`)
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('关注成功')
        this.post.has_follow = true
      }
    },
    async unfollow () {
      // id 需要关注文章的作者
      const id = this.post.user.id
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      console.log(res)
      const { statusCode } = res.data
      if (statusCode === 200) {
        this.$toast.success('取消关注')
        this.post.has_follow = false
      }
    },
    async like () {
      const id = this.post.id
      const res = await this.$axios.get(`/post_like/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        //   重新渲染
        this.getPostDetail()
        this.$toast.success(message)
      }
    },
    async handleFocus () {
      console.log('获取交点')
      this.isFocus = true
      //   dom异步更新问题
      await this.$nextTick()
      //   让文本域自动获取交点
      this.$refs.textarea.focus()
    },
    handleBlur () {
      // 加一个判断。如果文本域中有内容，就不应该失去交点隐藏
      if (this.content) {
        return
      }
      this.isFocus = false
    },
    async star () {
      console.log('收藏')
      const id = this.post.id
      const res = await this.$axios.get(`/post_star/${id}`)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetail()
      }
    },
    async reply (id) {
      console.log(id)
      //   记录了评论需要的id
      this.parentId = id
      //   显示文本域
      this.isFocus = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send () {
      const id = this.$route.params.id
      const res = await this.$axios.post(`/post_comment/${id}`, {
        content: this.content,
        parent_id: this.parentId
      })
      //   console.log(this.post.id)

      //   console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getCommentList()
        this.getPostDetail()
        this.isFocus = false
        this.content = ''
        this.parentId = ''
      }
    }
  },
  watch: {
    //   监听路由变化，获取详情信息
    $route () {
      this.getPostDetail()
      this.getCommentList()
    }
  }
}
</script>

<style lang="scss" scoped>
.post-detail{
    padding-bottom: 100px;
    .header{
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        .left{
            display: flex;
            .iconnew{
                font-size: 50px;
            }
        }
        .right{
            .btn-followed{
            height: 30px;
            line-height: 30px;
            border: 1px solid #ccc;
            padding:0 15px;
            border-radius: 15px;
            }
            .btn-follow{
            height: 30px;
            line-height: 30px;
            border: 1px solid red;
            padding:0 15px;
            border-radius: 15px;
            background-color: red;
            color: #fff;
            text-align: center;
            }
        }
    }
    .main{
        padding: 10px;
        border-bottom: 3px solid #ddd;
        .post-title{
            font-size: 18px;
            font-weight: 700;
        }
        .post-info{
            color: #888;
            padding: 10px 0;
            span{
            margin-right: 10px;
            }
        }
        video{
            width: 100%;
        }
        .some{
            display: flex;
            justify-content: space-around;
            margin-top: 10px;
            padding: 10px 0;

            .num{
                width: 80px;
                height: 30px;
                border-radius: 15px;
                font-size: 14px;
                border: 1px solid #ccc;
                display: flex;
                justify-content: center;
                align-items: center;
                span:first-child{
                    margin-right: 5px;
                }
            }
            .like{
                color: red;
            }
            .wet{
                width: 80px;
                height: 30px;
                border-radius: 15px;
                font-size: 14px;
                border: 1px solid #ccc;
                display: flex;
                justify-content: center;
                align-items: center;
                span:first-child{
                    margin-right: 5px;
                    color: #08c406;
                }
            }
        }
    }
    .info{
        width: 100%;
        padding: 10px;
        .top{
            text-align: center;
            font-size: 18px;
        }
    }
    .footer{
        width: 100%;
        padding: 10px 0;
        position: fixed;
        bottom: 0;
        left: 0;
        background-color: #fff;
        .post-comment{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            input{
                height: 30px;
                width: 180px;
                background-color: #ccc;
                border-radius: 15px;
                padding-left: 20px;
            }
            .iconfont{
                font-size: 20px;
            }
            .comment{
                position: relative;
                span{
                    position: absolute;
                    background-color: red;
                    color: #fff;
                    height: 20px;
                    line-height: 20px;
                    padding: 0 10px;
                    right: -20px;
                    top: -4px;
                    border-radius: 10px
                }
            }
            .star{
                    color: red;
                }
        }
        .post-area{
            width: 100%;
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            textarea{
                padding:10px;
                width: 240px;
                height: 70px;
                background-color: #ddd;
                border-radius: 10px;
            }
            .send{
                // align-self: flex-end;
                width: 60px;
                height: 26px;
                color: #fff;
                line-height: 26px;
                background-color: red;
                text-align: center;
                border-radius: 13px;
            }
        }
    }
}
</style>
