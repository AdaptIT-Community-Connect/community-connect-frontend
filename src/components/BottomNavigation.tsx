import React from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Search, Plus, MessageCircle, User, Briefcase, ClipboardList } from "lucide-react"

const BottomNavigation = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { icon: Home, label: "Home", path: "/home", badge: null },
    { icon: Search, label: "Browse", path: "/browse", badge: null },
    { icon: Plus, label: "Post Job", path: "/post-job", badge: null },
    { icon: ClipboardList, label: "Applications", path: "/applicationlist", badge: null },
    { icon: Briefcase, label: "My Jobs", path: "/myjobs", badge: null },
    { icon: MessageCircle, label: "Messages", path: "/messages", badge: 2 },
    { icon: User, label: "Profile", path: "/profile", badge: null },
  ]

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/"
    }
    if (path === "/messages") {
      return location.pathname === "/messages" || location.pathname.startsWith("/chat")
    }
    return location.pathname === path
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item, index) => {
            const IconComponent = item.icon
            const active = isActive(item.path)
            return (
              <div key={index} className="relative">
                <Button
                  variant={active ? "default" : "ghost"}
                  size="sm"
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                    active
                      ? "bg-primary text-primary-foreground shadow-card"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </Button>

                {item.badge && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default BottomNavigation
