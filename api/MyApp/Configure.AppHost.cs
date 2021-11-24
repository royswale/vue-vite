using Funq;
using ServiceStack;
using MyApp.ServiceInterface;

[assembly: HostingStartup(typeof(MyApp.AppHost))]

namespace MyApp;

public class AppHost : AppHostBase, IHostingStartup
{
    public AppHost() : base("MyApp", typeof(MyServices).Assembly) {}

    public override void Configure(Container container)
    {
        RawHttpHandlers.Add(ApiHandlers.Json("/api/{Request}"));
        
        SetConfig(new HostConfig {
        });

        Plugins.Add(new SpaFeature {
            EnableSpaFallback = true
        });
        Plugins.Add(new CorsFeature(allowOriginWhitelist:new[]{ 
            "https://localhost:5001",
            "http://localhost:5000",
            "http://localhost:3000",
            "https://$DEPLOY_CDN"
        }, allowCredentials:true));
    }

    public void Configure(IWebHostBuilder builder) => builder
        .ConfigureServices((context, services) => 
            services.ConfigureNonBreakingSameSiteCookies(context.HostingEnvironment))
        .Configure(app => {
            if (!HasInit) 
                app.UseServiceStack(new AppHost());
        });
}
