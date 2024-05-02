
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
  singer: z.string().min(2).max(50),
  song: z.string().min(2).max(50),
  genre: z.string().min(2).max(50),
  image: z.string().min(2),
})


export function Update({ id }: any) {
  console.log(id)
  const [selected, setSelected] = useState()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      singer: "",
      song: "",
      genre: "",
      image: ""
    },
  })

  // 2. Define a submit handler.
  const { toast } = useToast()
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = await axios.post('http://localhost:3000/song/create', {
      artist: values.singer,
      song: values.song,
      genre: values.genre,
      image: values.image
    })
    if (data) {
      try {
        toast({
          title: 'created',
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
      catch (err: any) {
        toast({
          title: { err },
          description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={"border-2 ring-1 absolute z-50"}>Upload Song</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create song</DialogTitle>
          <DialogDescription className=" pt-3">
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className=" flex  gap-x-3">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Artist" />
                </SelectTrigger>

              </Select>
              <FormField
                control={form.control}
                name="singer"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={"artist"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="song"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder={"genre"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /><FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder={"image"} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" >Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog >
  )
}
