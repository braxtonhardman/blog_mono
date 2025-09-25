type TypographyH3Props = { 
    text: string
    className?: string
}

export function TypographyH3({text, className}: TypographyH3Props) {
    return (
      <h3 className={`scroll-m-20 text-2xl tracking-tight ${className}`}>
        {text}
      </h3>
    )
  }
  