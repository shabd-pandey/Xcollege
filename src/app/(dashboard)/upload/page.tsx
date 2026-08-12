import type { Metadata } from "next";
import { UploadMaterialForm } from "@/components/forms/UploadMaterialForm";
import { Card, CardContent } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Upload material",
};

export default function UploadPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader
        title="Upload study material"
        description="Share notes, PYQs, assignments or practicals. Uploads appear after admin approval."
      />
      <Card>
        <CardContent className="p-6">
          <UploadMaterialForm />
        </CardContent>
      </Card>
    </div>
  );
}
