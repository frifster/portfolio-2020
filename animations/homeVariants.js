export const variants = {
  enter: {
    y: 1000,
    opacity: 0
  },
  center: {
    zIndex: 1,
    y: 0,
    opacity: 1
  }
}
export const spring = {
  y: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 }
}