
type TypographyProps = { 
    text: string
    className?: string
}

export function TypographyH1({text, className}: TypographyProps) {
    return (
      <h1 className={`scroll-m-20 text-center tracking-tight text-balance ${className}`}>
        {text}
      </h1>
    )
  }
  