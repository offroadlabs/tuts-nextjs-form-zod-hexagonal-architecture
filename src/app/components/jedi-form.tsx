"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  padawanSchema,
  type PadawanFormData,
} from "@/core/domain/validation/padawan-schema";
import { handlePadawanRegistration } from "../actions/register-padawan";

export function JediRegistrationForm() {
  const { toast } = useToast();
  const form = useForm<PadawanFormData>({
    resolver: zodResolver(padawanSchema),
    defaultValues: {
      name: "",
      age: 0,
      midichlorianCount: 7000,
      homeworld: "",
      primarySkill: "combat",
      background: "",
    },
  });

  async function onSubmit(data: PadawanFormData) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    const result = await handlePadawanRegistration(formData);

    toast({
      title: result.success ? "Registration successful" : "Error",
      description: result.message,
      variant: result.success ? "default" : "destructive",
    });

    if (result.success) {
      form.reset();
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Jedi Academy</CardTitle>
        <CardDescription>
          Submit your application to join the Order
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Padawan Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Luke Skywalker" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="4"
                      max="30"
                      placeholder="19"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="midichlorianCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Midichlorian Count</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min="7000"
                      max="20000"
                      step="100"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="homeworld"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Homeworld</FormLabel>
                  <FormControl>
                    <Input placeholder="Tatooine" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="primarySkill"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Primary Skill</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a skill" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="combat">
                        Lightsaber Combat ⚔️
                      </SelectItem>
                      <SelectItem value="healing">
                        Force Healing 💚
                      </SelectItem>
                      <SelectItem value="meditation">
                        Deep Meditation 🧘
                      </SelectItem>
                      <SelectItem value="telepathy">Telepathy 🧠</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="background"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Story</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your journey..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit my application 🌟
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
