import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {
  return (
    <section key="1" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4 lg:gap-12">
        <div className="space-y-8 xl:space-y-10">
          <Card>
            <CardContent className="grid gap-4 border-y py-4">
              <img
                alt="Caretaker 1"
                className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                height="182"
                src="/placeholder.svg"
                width="325"
              />
              <CardHeader>
                <CardTitle>Caretaker 1</CardTitle>
                <CardDescription>Experienced and loving caretaker</CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8 xl:space-y-10">
          <Card>
            <CardContent className="grid gap-4 border-y py-4">
              <img
                alt="Caretaker 2"
                className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                height="182"
                src="/placeholder.svg"
                width="325"
              />
              <CardHeader>
                <CardTitle>Caretaker 2</CardTitle>
                <CardDescription>Experienced and loving caretaker</CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8 xl:space-y-10">
          <Card>
            <CardContent className="grid gap-4 border-y py-4">
              <img
                alt="Caretaker 3"
                className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                height="182"
                src="/placeholder.svg"
                width="325"
              />
              <CardHeader>
                <CardTitle>Caretaker 3</CardTitle>
                <CardDescription>Experienced and loving caretaker</CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-8 xl:space-y-10">
          <Card>
            <CardContent className="grid gap-4 border-y py-4">
              <img
                alt="Caretaker 4"
                className="aspect-video w-full overflow-hidden rounded-xl object-cover"
                height="182"
                src="/placeholder.svg"
                width="325"
              />
              <CardHeader className="text-left mx-2">
                <CardTitle>Caretaker 4</CardTitle>
                <CardDescription>Experienced and loving caretaker</CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

