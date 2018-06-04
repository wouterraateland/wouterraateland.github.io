export const theme = (...args) => props =>
  args.reduce((acc, a) => acc && acc[a], props.theme)

export default theme
