export const SPRINT_STATUS_QUERY = `
  *[_type == "sprintStatus" && isCurrent == true][0] {
    _id,
    sprintName,
    deadline,
    technicalStatus,
    strategicObjective,
  }
`

export const RAW_LOG_QUERY = `
  *[_type == "logEntry"] | order(entryDate desc) {
    _id,
    entryDate,
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
    tags,
    readingTime,
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
    tags,
    readingTime,
    originalUrl,
  }
`
