import React from 'react';

import ChapterFooterNavBar from '@/pages/chapter/components/footer/components/navBar';
import ChapterFooterSettingBar from '@/pages/chapter/components/footer/components/settingBar';
import ChapterFooterCatalog from '@/pages/chapter/components/footer/components/catalog';

const ChapterFooter: React.FC = React.memo(() => {
  return (
    <>
      <ChapterFooterNavBar />
      <ChapterFooterSettingBar />
      <ChapterFooterCatalog />
    </>
  );
});

export default ChapterFooter;
