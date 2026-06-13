import Image from 'next/image';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarRail, useSidebar } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from 'lucide-react';

export function AppSidebar() {
  const { state, isMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center">
        <Image
          src="/logo.svg"
          alt="Fullstack Agent"
          width={40}
          height={40}
        />
        <div>Fullstack Next.js Agent</div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>Group 1</SidebarGroup>
        <SidebarGroup>Group 2</SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center">
              <Image
                src="/logo.svg"
                alt="User avatar"
                width={32}
                height={32}
                className="size-8 shrink-0 rounded-lg"
              />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="truncate font-semibold">shadcn</span>
                <span className="truncate text-xs text-muted-foreground">m@example.com</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-data-[collapsible=icon]:hidden" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-56"
            side={isMobile ? 'bottom' : state === 'collapsed' ? 'right' : 'top'}
            align={isMobile ? 'start' : 'end'}
            sideOffset={8}>
            <DropdownMenuLabel className="p-0 font-normal text-foreground">
              <div className="flex items-center gap-2 rounded-md px-2 py-1.5">
                <Image
                  src="/logo.svg"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="size-8 shrink-0 rounded-lg"
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">shadcn</span>
                  <span className="truncate text-xs text-muted-foreground">m@example.com</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Sparkles />
              Upgrade to Pro
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <BadgeCheck />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem>
              <CreditCard />
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell />
              Notifications
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
