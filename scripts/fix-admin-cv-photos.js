/**
 * Fix Admin CV Photos
 * 
 * This script:
 * 1. Checks how many CVs the admin has
 * 2. Replaces randomuser.me photo URLs with a CORS-friendly alternative
 */

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Use a CORS-friendly placeholder service or remove photoUrl
// Option 1: Use ui-avatars.com (CORS-friendly)
// Option 2: Use a data URI placeholder
// Option 3: Remove photoUrl entirely

function getPlaceholderPhoto(fullName) {
  // Use ui-avatars.com which is CORS-friendly
  const name = fullName ? encodeURIComponent(fullName.split(' ')[0]) : 'User';
  return `https://ui-avatars.com/api/?name=${name}&size=200&background=random&color=fff&bold=true`;
}

async function fixAdminCVPhotos() {
  const adminEmail = 'admin@admin.com';
  
  console.log('🔧 Fixing admin CV photos...\n');
  
  try {
    // Find admin user
    const adminUser = await prisma.user.findUnique({
      where: { email: adminEmail }
    });
    
    if (!adminUser) {
      console.error('❌ Admin user not found!');
      return;
    }
    
    console.log(`✅ Found admin user: ${adminUser.email} (ID: ${adminUser.id})\n`);
    
    // Get all CVs
    const cvs = await prisma.cV.findMany({
      where: { userId: adminUser.id }
    });
    
    console.log(`📋 Found ${cvs.length} CVs\n`);
    
    let updatedCount = 0;
    
    for (const cv of cvs) {
      try {
        // Parse the content
        const content = typeof cv.content === 'string' 
          ? JSON.parse(cv.content) 
          : cv.content;
        
        // Check if it has a randomuser.me photo URL
        if (content.photoUrl && content.photoUrl.includes('randomuser.me')) {
          // Replace with placeholder
          const newPhotoUrl = getPlaceholderPhoto(content.fullName);
          content.photoUrl = newPhotoUrl;
          
          // Update the CV
          await prisma.cV.update({
            where: { id: cv.id },
            data: {
              content: JSON.stringify(content)
            }
          });
          
          console.log(`   ✅ Updated: ${cv.title} (${content.fullName})`);
          updatedCount++;
        }
      } catch (error) {
        console.log(`   ⚠️  Failed to update ${cv.title}: ${error.message}`);
      }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`✅ Successfully updated: ${updatedCount} CVs`);
    console.log(`📊 Total CVs: ${cvs.length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fixAdminCVPhotos()
  .catch((error) => {
    console.error('Failed to fix CV photos:', error);
    process.exit(1);
  });
