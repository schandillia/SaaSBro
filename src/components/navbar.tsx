import Link from "next/link"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { ArrowRight } from "lucide-react"
import { SignOutButton } from "@clerk/nextjs"
import { Button, buttonVariants } from "@/components/ui/button"
import brand from "@/lib/constants/brand.json"
import { currentUser } from "@clerk/nextjs/server"

export const Navbar = async () => {
  const user = await currentUser()

  // Check if both brand parts exist for two-word brand name
  const isTwoPartBrand = brand.BRAND_FIRST_PART && brand.BRAND_LAST_PART

  return (
    <nav className="sticky z-[100] h-16 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold text-gray-700">
            {isTwoPartBrand ? (
              <>
                {brand.BRAND_FIRST_PART}
                <span className="text-brand-700">{brand.BRAND_LAST_PART}</span>
              </>
            ) : (
              brand.BRAND
            )}
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <SignOutButton>
                  <Button size="sm" variant="ghost">
                    Sign out
                  </Button>
                </SignOutButton>

                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    size: "sm",
                    className: "sm:flex items-center gap-1",
                  })}
                >
                  Dashboard <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Pricing
                </Link>
                <Link
                  href="/sign-in"
                  className={buttonVariants({
                    size: "sm",
                    variant: "ghost",
                  })}
                >
                  Sign in
                </Link>
                <div className="h-8 w-px bg-gray-200" />
                <Link
                  href="/sign-up"
                  className={buttonVariants({
                    size: "sm",
                    className: "flex items-center gap-1.5",
                  })}
                >
                  Sign up <ArrowRight className="size-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}
