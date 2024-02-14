import clsx from 'clsx';
import { opensans } from '@/components/fonts';

import { EditFormHeader } from '@/components/pages/profile/edit/components/edit-form-header';
import { EditForm } from '@/components/pages/profile/edit/components/edit-form';

export default function EditPage() {
  return (
    <main>
      <div className="bg-white px-5 py-5 shadow-md rounded-lg">
        <EditFormHeader />

        <section className={clsx('mt-6', opensans.className)}>
          <EditForm />
        </section>
      </div>
    </main>
  );
}
