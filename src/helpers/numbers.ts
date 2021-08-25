const parseIntOr = (str: string | undefined, fallback: number): number => {
  if (!str) {
    return fallback
  }

  const value = Number.parseInt(str, 10)

  return !Number.isNaN(value) ? value : fallback
}

export default parseIntOr
