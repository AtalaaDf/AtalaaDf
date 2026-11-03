import SectionTitle from '../../ui/SectionTitle'
import { Card, CardHeader, CardContent } from '../../ui/Card'

export default function AboutCard() {
  return (
    <Card className="w-full max-w-[1267px] border-white/10 bg-[#1e1e1e]/90 backdrop-blur-md">
      <CardHeader className="p-6 sm:px-10 sm:pt-10 sm:pb-3 lg:pt-[45px] lg:pl-[80px] pb-3">
        <SectionTitle fontFamily="sans" className="text-2xl sm:text-3xl lg:text-[1.8vw]">
          About Me
        </SectionTitle>
      </CardHeader>
      <CardContent className="p-6 sm:px-10 sm:pb-10 sm:pt-0 lg:pl-[80px] pt-0">
        <div className="min-h-[100px] sm:min-h-[140px] text-white/60 font-sans text-sm leading-relaxed">
          I am a student with a keen interest in website development. I am currently deepening my skills in React, TypeScript, Node.js and Express.
          <br /><br />
          I am a member of Google Developer Group On Campus at Sriwijaya University, where I contribute as a front-end development member.
          <br /><br />
          I enjoy learning new things and look for opportunities to develop myself. Joining student activity units is one of the ways I continue to grow.
        </div>
      </CardContent>
    </Card>
  )
}
