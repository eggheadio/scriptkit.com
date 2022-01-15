import '@johnlindquist/kit'
import '@johnlindquist/kit/api/global'
import find from 'lodash/find'

async function getCourse(slug: string) {
  const courses: any = await readJson(
    path.resolve('public', 'data', `courses.json`),
  )
  return find(courses, {slug})
}

export {getCourse}
