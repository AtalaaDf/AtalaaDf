import SectionTitle from '../../ui/SectionTitle'
import { Card, CardHeader, CardContent } from '../../ui/Card'

export default function AboutCard() {
  return (
    <Card className="w-full max-w-[1267px] border-white/10 bg-[#1e1e1e]/90 backdrop-blur-md">
      <CardHeader className="p-6 sm:p-10 lg:pt-[45px] lg:pl-[80px] pb-3">
        <SectionTitle fontFamily="sans" className="text-2xl sm:text-3xl lg:text-[1.8vw]">
          About Me
        </SectionTitle>
      </CardHeader>
      <CardContent className="p-6 sm:p-10 lg:pl-[80px] pt-0">
        <div className="min-h-[100px] sm:min-h-[140px] text-white/60 font-sans text-sm sm:text-base leading-relaxed">
          {/* Placeholder teks */}
        </div>
      </CardContent>
    </Card>
  )
}
