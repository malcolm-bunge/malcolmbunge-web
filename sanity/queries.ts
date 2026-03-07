export const SPRINT_STATUS_QUERY = `
  *[_type == "sprintStatus"][0] {
    _id,
    sprintNumber,
    deadline,
    technicalStatus,
    strategicObjective,
    dateUpdated,
  }
`

export const RAW_LOG_QUERY = `
  *[_type == "logEntry"] | order(order desc) {
    _id,
    date,
    content,
  }
`

export const ARTICLES_QUERY = `
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    image,
  }
`

export const ARTICLE_QUERY = `
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    excerpt,
    content,
    image,
  }
`
