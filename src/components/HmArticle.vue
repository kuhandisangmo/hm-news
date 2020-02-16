<template>
  <div class="hm-articl" @click="$router.push(`post-detail/${post.id}`)">
       <!-- 视屏封面图 -->
      <div class="more-img" v-if="post.type===2">
          <div class="left">
              <p class="txt-cut">{{post.title}}</p>
              <div class="moreimg">
                  <img class="shiping" :src="post.cover[0].url" alt="">
                  <div class="box iconfont iconshipin"></div>
              </div>
              <div class="follow">
                  <span>{{post.user.nickname}}</span>
                  <span>{{post.comment_length}}跟帖</span>
              </div>
          </div>
      </div>
      <!-- 一张封面图 -->
      <div class="singer-img" v-else-if="post.cover.length<2">
          <div class="left">
              <p class="txt-cut">{{post.title}}</p>
              <div class="follow">
                  <span>{{post.user.nickname}}</span>
                  <span>{{post.comment_length}}跟帖</span>
              </div>
          </div>
          <div class="right">
              <img :src="post.cover[0].url" alt="">
          </div>
      </div>
      <!-- 多张封面图 -->
      <div class="more-img" v-else>
          <div class="left">
              <p class="txt-cut">{{post.title}}</p>
              <div class="moreimg">
                  <img v-for="item in post.cover" :key="item.id" :src="item.url" alt="">
              </div>
              <div class="follow">
                  <span>{{post.user.nickname}}</span>
                  <span>{{post.comment_length}}跟帖</span>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="scss" scoped>
.hm-articl{
    .singer-img{
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #ccc;
        .left{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .txt-cut{
                font-size: 16px;
                color: #333;
            }
            .follow{
                font-size: 12px;
                color: #868686;
                span{
                    margin-right: 10px;
                }
            }
        }
        .right{
            width: 120px;
            height: 75px;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }
    .more-img{
        padding: 10px;
        display: flex;
        border-bottom: 1px solid #ccc;
        .left{
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .txt-cut{
                font-size: 16px;
                color: #333;
            }
            .moreimg{
                position: relative;
                display: flex;
                margin: 5px 0;
                justify-content: space-around;
                .shiping{
                    width: 340px;
                    height: 170px;
                }
                .box{
                    font-size: 26px;
                    z-index: 999;
                    position: absolute;
                    width: 40px;
                    height: 40px;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%,-50%);
                    color: #fff;
                    background-color: rgba(0,0,0,.5);
                    border-radius: 50%;
                    text-align: center;
                    line-height: 40px;
                }
                img{
                    width: 112px;
                    height: 74px;
                    margin-right: 4px;
                }
            }
            .follow{
                font-size: 12px;
                color: #868686;
                span{
                    margin-right: 10px;
                }
            }
        }
    }
}
</style>
