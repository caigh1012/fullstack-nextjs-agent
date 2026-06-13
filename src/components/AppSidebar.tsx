'use client';

import * as React from 'react';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BadgeCheck, Bell, ChevronsUpDown, CirclePlus, CreditCard, LogOut, MoreHorizontal, Search, Sparkles, Trash2 } from 'lucide-react';
import { Button } from './ui/button';

type Session = {
  id: string;
  title: string;
  preview: string;
  time: string;
};

const MOCK_SESSIONS: Session[] = Array.from({ length: 30 }, (_, index) => {
  const num = String(index + 1).padStart(2, '0');
  return {
    id: `session_${num}`,
    title: `会话 ${num} - Mock 标题内容用于展示滚动与截断效果`,
    preview: `这里是会话内容预览（第 ${num} 条），用于展示第二行信息与截断效果。`,
    time: `${8 + (index % 10)}:${String((index * 7) % 60).padStart(2, '0')}`,
  };
});

export function AppSidebar() {
  const { state, isMobile } = useSidebar();
  const [searchValue, setSearchValue] = React.useState('');
  const [sessions, setSessions] = React.useState<Session[]>(MOCK_SESSIONS);
  const [activeSessionId, setActiveSessionId] = React.useState<string>(MOCK_SESSIONS[0]?.id ?? '');

  const filteredSessions = React.useMemo(() => {
    const keyword = searchValue.trim().toLowerCase();
    if (!keyword) return sessions;
    return sessions.filter((s) => {
      const title = s.title.toLowerCase();
      const preview = s.preview.toLowerCase();
      return title.includes(keyword) || preview.includes(keyword);
    });
  }, [searchValue, sessions]);

  const handleDeleteSession = React.useCallback((id: string) => {
    setSessions((prev) => {
      const nextSessions = prev.filter((s) => s.id !== id);
      setActiveSessionId((prevActiveId) => {
        if (prevActiveId !== id) return prevActiveId;
        return nextSessions[0]?.id ?? '';
      });
      return nextSessions;
    });
  }, []);

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
      <SidebarContent className="overflow-hidden">
        <SidebarGroup className="shrink-0">
          <Button variant="outline">
            <CirclePlus />
            <span>添加会话</span>
          </Button>
        </SidebarGroup>
        <SidebarGroup className="flex min-h-0 flex-1 flex-col">
          <SidebarGroupLabel>会话</SidebarGroupLabel>
          <div className="relative shrink-0 group-data-[collapsible=icon]:hidden">
            <Search className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 text-muted-foreground" />
            <SidebarInput
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="搜索会话…"
              className="pl-8"
            />
          </div>
          <SidebarGroupContent className="mt-2 min-h-0 flex-1 overflow-y-auto group-data-[collapsible=icon]:hidden">
            <SidebarMenu>
              {filteredSessions.length === 0 ? (
                <SidebarMenuItem>
                  <div className="text-center px-4 py-4 text-xs text-muted-foreground">暂无会话</div>
                </SidebarMenuItem>
              ) : (
                filteredSessions.map((session) => (
                  <SidebarMenuItem key={session.id}>
                    <SidebarMenuButton
                      size="lg"
                      isActive={session.id === activeSessionId}
                      onClick={() => setActiveSessionId(session.id)}
                      className="h-auto items-start py-2">
                      <div className="flex min-w-0 flex-1 flex-col">
                        <div className="truncate leading-5 font-medium">{session.title}</div>
                        <div className="mt-0.5 flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
                          <div className="min-w-0 flex-1 truncate">{session.preview}</div>
                          <div className="shrink-0 tabular-nums">{session.time}</div>
                        </div>
                      </div>
                    </SidebarMenuButton>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuAction
                          showOnHover
                          className="top-[50%]! translate-y-[-50%]"
                          onClick={(e) => e.stopPropagation()}
                          aria-label="会话菜单">
                          <MoreHorizontal />
                        </SidebarMenuAction>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        side="right"
                        sideOffset={6}
                        className="w-44">
                        <DropdownMenuItem
                          variant="destructive"
                          onSelect={() => handleDeleteSession(session.id)}>
                          <Trash2 />
                          删除会话
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
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
