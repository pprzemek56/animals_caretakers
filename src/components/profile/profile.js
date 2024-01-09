import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <Avatar className="h-32 w-32">
        <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
        <AvatarFallback>JP</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h1 className="text-2xl font-bold">John Pet Owner</h1>
        <p className="text-gray-500 dark:text-gray-400">john.petowner@acme.inc</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          A pet owner looking for a reliable and caring person to take care of my beloved animal.
        </p>
      </div>
      <Tabs className="w-full max-w-md" defaultValue="profile">
        <TabsList className="flex justify-center gap-2">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="contact">Contact</TabsTrigger>
          <TabsTrigger value="address">Address</TabsTrigger>
          <TabsTrigger value="picture">Change Picture</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Profile</h2>
            <p>Full Name: John Pet Owner</p>
            <p>Email: john.petowner@acme.inc</p>
            <p>Bio: A pet owner looking for a reliable and caring person to take care of my beloved animal.</p>
            <Button className="w-full">Edit Profile</Button>
          </div>
        </TabsContent>
        <TabsContent value="contact">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Contact</h2>
            <p>Phone Number: (123) 456-7890</p>
            <Button className="w-full">Edit Contact</Button>
          </div>
        </TabsContent>
        <TabsContent value="address">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Address</h2>
            <p>Street: 123 Main St</p>
            <p>City: New York</p>
            <p>State: NY</p>
            <p>Zip Code: 10001</p>
            <Button className="w-full">Edit Address</Button>
          </div>
        </TabsContent>
        <TabsContent value="picture">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Profile Picture</h2>
            <img alt="Profile Picture" className="w-32 h-32 items-center" src="/placeholder.svg" />
            <Button className="w-full">Change Your Picture</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}