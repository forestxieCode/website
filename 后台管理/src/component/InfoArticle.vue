<template>
  <article class="comp__article card">
    <h4 class="article-title">{{ article.title }}</h4>
    <p class="article-pieces">
      <i class="fa fa-fw fa-bookmark" aria-hidden="true"></i>
      {{ article.category }}
      <i class="fa fa-fw fa-calendar" aria-hidden="true"></i>
      {{ article.time }}
      <i class="fa fa-fw fa-eye" aria-hidden="true"></i>
      {{ article.reading }}
    </p>
    <div v-html="article.content" class="article-content"></div>
  </article>
</template>

<script>
export default {
  name: 'InfoArticle',
  props: {
    article: { type: Object, required: true }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
.comp__article {
  width: 80%;
  max-width: 1200px;
  padding: 20px 50px;
  margin: 0 auto;
  border-radius: 5px;
}

.article-title {
  font-size: 24px;
  text-align: center;
}

.article-pieces {
  font-size: 14px;
  text-align: center;
  color: #919191;
}

.article-content {
  padding-top: 20px;
  border-top: 1px dashed #e9e9e9;
  margin-top: 30px;
  line-height: 1.8;
}

.article-pieces .fa {
  margin-left: 20px;
}

.article-pieces .fa:first-child {
  margin-left: 0;
}
</style>

<style>
.comp__article img {
  display: block;
  max-width: 100%;
  margin: 0 auto;
}

.comp__article blockquote {
  padding: .5em .5em .5em 1.5em;
  border-left: 3px solid #add8f7;
  margin: 0;
  background-color: #ecf6fd;
}

.comp__article li {
  margin: 1em 0;
}
</style>
