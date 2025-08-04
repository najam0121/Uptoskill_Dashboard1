import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva,  } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled)

const Label = React.forwardRef,
  React.ComponentPropsWithoutRef &
    VariantProps
>(({ className, ...props }, ref) => (
  
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }


