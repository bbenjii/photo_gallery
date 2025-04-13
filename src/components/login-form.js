import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {providerMap, signIn} from "@/auth"
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"
import Image from "next/image"

async function handleSubmit(formData) {
    "use server"
    console.log("function called")
    // let user =  await signIn("credentials", formData)
    // let user = await signIn()
    //
    // console.log("sign in done")

    // redirect("/");
    //
    // if (user !== null) {
    //     redirect("/");
    // }
    // console.log(user)


}

export function LoginForm({
                              className,
                              ...props
                          }) {
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Admin Login</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <form action={async (formData) => {
                            "use server"
                            try {
                                await signIn("credentials", formData)
                            } catch (error) {
                                if (error instanceof AuthError) {
                                    return null
                                }
                                throw error
                            }
                        }}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type={"email"} placeholder="email" required/>
                            </div>
                            <div className="grid gap-3">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input id="password" name="password" type="password" placeholder={"password"} required/>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button type="submit" className="w-full">
                                    Login
                                </Button>
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col gap-3">
                        {Object.values(providerMap).map((provider, index) => (
                            <form key={index}
                                  action={async () => {
                                      "use server"
                                      try {
                                          await signIn(provider.id, {
                                              redirectTo: props.searchParams?.callbackUrl ?? "",
                                          })
                                      } catch (error) {
                                          // Signin can fail for a number of reasons, such as the user
                                          // not existing, or the user not having the correct role.
                                          // In some cases, you may want to redirect to a custom error
                                          if (error instanceof AuthError) {
                                              return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                                          }

                                          // Otherwise if a redirects happens Next.js can handle it
                                          // so you can just re-thrown the error and let Next.js handle it.
                                          // Docs:
                                          // https://nextjs.org/docs/app/api-reference/functions/redirect#server-component
                                          throw error
                                      }
                                  }}
                            >
                                <Button key={index} variant="outline" className="w-full">
                                    {`Login with ${provider.name}`}
                                </Button>
                            </form>
                        ))}

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
