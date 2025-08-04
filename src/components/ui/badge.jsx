import * as React from "react"
import { cva,  } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus,
  {
    variants,
        secondary,
        destructive,
        outline,
      },
    },
    defaultVariants,
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes,
    VariantProps {}

function Badge({ className, variant, ...props  }) {
  return (
    
  )
}

export { Badge, badgeVariants }


