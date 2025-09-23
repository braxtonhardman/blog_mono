import {
    Card,
    CardAction,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


type LetterCardDispalyProp = { 
  title: string;
  createdAt: string;
}

// Initial Letter Card used by the Letters List 
function LetterCard({title, createdAt}: LetterCardDispalyProp) {

  const date = new Date(createdAt);

  // Format it nicely: "September 21, 2025"
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardAction>{formattedDate}</CardAction>
        </CardHeader>
    </Card>
    
  )
}

export default LetterCard