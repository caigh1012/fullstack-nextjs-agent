'use client';

import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');

  // return (
  //   <div className="flex min-h-dvh flex-col gap-6 p-6">
  //     <div className="flex items-center justify-between gap-3">
  //       <h1 className="text-xl font-semibold tracking-tight">{t('title')}</h1>

  //       <Button
  //         type="button"
  //         variant="outline"
  //         size="icon"
  //         aria-label={t('toggleTheme')}
  //         onClick={() => setTheme(isDark ? 'light' : 'dark')}
  //         className="relative">
  //         <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
  //         <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  //       </Button>
  //     </div>

  //     <div className="flex flex-col gap-3">
  //       <div className="flex flex-wrap items-center gap-2">
  //         <span className="text-sm text-muted-foreground">{t('language')}:</span>
  //         <Button
  //           type="button"
  //           size="sm"
  //           variant="outline"
  //           onClick={() => switchLocale('en')}>
  //           English
  //         </Button>
  //         <Button
  //           type="button"
  //           size="sm"
  //           variant="outline"
  //           onClick={() => switchLocale('zh')}>
  //           简体中文
  //         </Button>
  //         <Button
  //           type="button"
  //           size="sm"
  //           variant="outline"
  //           onClick={() => switchLocale('zh-TW')}>
  //           繁體中文
  //         </Button>
  //       </div>
  //     </div>

  //     <Button>{t('cta')}</Button>
  //   </div>
  // );

  return <div>{t('title')}</div>;
}
