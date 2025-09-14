import 'dotenv/config';
import { connectMongo } from './mongoose';
import { AdminUser, AdminRole } from '../models/AdminUser';
import { Product, ProductStatus } from '../models/Product';
import { JobPosting, EmploymentType } from '../models/JobPosting';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

async function seed() {
  await connectMongo();

  // Seed SUPER_ADMIN
  const superAdminEmail = process.env.SUPER_ADMIN_EMAIL || 'admin@selam.com';
  const superAdminPasswordRaw = process.env.SUPER_ADMIN_PASSWORD || 'SuperSecurePassword123!';
  const superAdminPassword = await bcrypt.hash(superAdminPasswordRaw, 10);
  await AdminUser.updateOne(
    { email: superAdminEmail },
    {
      $setOnInsert: {
        email: superAdminEmail,
        passwordHash: superAdminPassword,
        displayName: 'Super Admin',
        role: AdminRole.SUPER_ADMIN,
        isActive: true,
      },
    },
    { upsert: true }
  );

  // Seed sample products
  await Product.updateOne(
    { slug: 'erp-solutions-suite' },
    {
      $setOnInsert: {
        slug: 'erp-solutions-suite',
        name: 'ERP Solutions Suite',
        category: 'Enterprise',
        shortDescription: 'Comprehensive ERP system for mid-large orgs.',
        longDescription: 'Full modular ERP with accounting, HR, inventory.',
        features: ['Real-time analytics', 'HR module', 'Inventory tracking'],
        priceModel: 'Custom pricing',
        status: ProductStatus.ACTIVE,
      },
    },
    { upsert: true }
  );

  await Product.updateOne(
    { slug: 'crm-platform' },
    {
      $setOnInsert: {
        slug: 'crm-platform',
        name: 'CRM Platform',
        category: 'Sales',
        shortDescription: 'Modern CRM for growing teams.',
        longDescription: 'Track leads, automate follow-ups, and close deals.',
        features: ['Lead management', 'Automation', 'Reporting'],
        priceModel: '$49/month',
        status: ProductStatus.COMING_SOON,
      },
    },
    { upsert: true }
  );

  // Seed sample job posting
  await JobPosting.updateOne(
    { title: 'Software Engineer' },
    {
      $setOnInsert: {
        title: 'Software Engineer',
        department: 'Engineering',
        location: 'Remote',
        employmentType: EmploymentType.FULL_TIME,
        description: 'Develop and maintain software.',
        requirements: ['3+ years experience', 'Node.js', 'MongoDB'],
        responsibilities: ['Write code', 'Review PRs'],
        compensationRange: '$60k-$90k',
        isPublished: true,
        isArchived: false,
        publishAt: new Date(),
      },
    },
    { upsert: true }
  );

  await mongoose.disconnect();
  console.log('Seeding complete.');
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
