import { Card, CardContent } from '@/components/ui/card';
import { Target, Heart, Users, Lightbulb } from 'lucide-react';

const MissionSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl mb-6">
            Our <span className="text-gradient">Mission & Vision</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We believe in the power of community and the potential of youth. Our platform bridges 
            the gap between community needs and youthful energy, creating meaningful connections 
            that benefit everyone.
          </p>
        </div>

        {/* Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mr-4">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower communities by connecting residents with skilled young people who can 
                provide valuable services while gaining real-world experience and building 
                meaningful relationships across generations.
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
            <CardContent className="p-8">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-secondary flex items-center justify-center mr-4">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A world where every community thrives through intergenerational collaboration, 
                where youth are valued for their skills and enthusiasm, and where neighbors 
                support each other in meaningful ways.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-8">Our Core Values</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Community First</h4>
              <p className="text-sm text-muted-foreground">
                Every decision we make strengthens our local communities
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Youth Empowerment</h4>
              <p className="text-sm text-muted-foreground">
                We believe in the potential and capability of young people
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Quality Service</h4>
              <p className="text-sm text-muted-foreground">
                We maintain high standards in every interaction and service
              </p>
            </div>

            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="h-8 w-8 text-primary" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Innovation</h4>
              <p className="text-sm text-muted-foreground">
                We continuously improve our platform and user experience
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;