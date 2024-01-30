import snowflake from './snowflake.js'

export default async () => {
  for (const i of [snowflake]) {
    await i()
  }
}
