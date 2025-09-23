type TypographyH4Props = { 
    text: string
}


export function TypographyH4({text}: TypographyH4Props) {
    return (
      <h4 className="scroll-m-20 text-lg tracking-tight text-foreground">
        {text}
      </h4>
    )
  }